import { constant, filter, flow, map, reduce, trim } from 'lodash/fp';
import { chunkString, pascalCase, when } from 'utils';
import * as yup from 'yup';

const DEFAULT_BINDNAME = 'HelloWorld';
const DEFAULT_FILENAME = 'helloworld-cyclebind.cfg';
const IDEAL_CHARS_PER_LINE = 82;
const MAX_CHARS_PER_LINE = 127;
const MIN_ROWS = 10;

const getLines = text => (text ? text.split('\n') : []);
const countLines = text => getLines(text).length;

const noSpacesSchema = yup.string().matches(/^\S+$/, {
  excludeEmptyString: true,
  message: 'Cannot contain spaces.',
});

const validateBindName = bindName => {
  return noSpacesSchema.validate(bindName);
};

const createAliasName = (bindName, index) => {
  const casedBindName = pascalCase(bindName);
  return index !== undefined
    ? `say${casedBindName}${index}`
    : `say${casedBindName}`;
};

const createSayCommand = (name, text) => {
  return `alias ${name} "say ${text}"`;
};

const isEmptyLine = line => line.length;

const processText = (text, settings = {}) => {
  const { ignoreEmptyLines, stripWhitespace = false } = settings;
  let lines = getLines(text);

  return flow(
    reduce(
      (accumulator, currentLine) => [
        ...accumulator,
        ...chunkString(currentLine, MAX_CHARS_PER_LINE),
      ],
      []
    ),
    when(constant(stripWhitespace), map(trim)),
    when(constant(ignoreEmptyLines), filter(isEmptyLine))
  )(lines);
};

const createCycleBind = (text, _bindName, settings) => {
  const selectedKey = settings.selectedKey || 'KEY';
  const lines = processText(text, settings);
  const bindName =
    (_bindName && _bindName.trim().length) ? _bindName.trim() : DEFAULT_BINDNAME;
  const bindCommandName = `bind${pascalCase(bindName)}`;

  const sayCommands = lines.map((text, index) => {
    const name = createAliasName(bindName, index);
    return createSayCommand(name, text);
  });

  const bindCommands = lines.map((_, index) => {
    const nextIndex = index === sayCommands.length - 1 ? 0 : index + 1;

    return `alias ${bindCommandName}${index} "${createAliasName(
      bindName,
      index
    )}; alias ${bindCommandName} ${bindCommandName}${nextIndex};"`;
  });

  return lines && lines.length
    ? `${sayCommands.join('\n')}
    
${bindCommands.join('\n')}

alias ${bindCommandName} ${bindCommandName}0

bind ${selectedKey} ${bindCommandName}

echo ">>> ${bindName} loaded."
`
    : '';
};

export {
  countLines,
  createCycleBind,
  DEFAULT_BINDNAME,
  DEFAULT_FILENAME,
  getLines,
  IDEAL_CHARS_PER_LINE,
  MAX_CHARS_PER_LINE,
  MIN_ROWS,
  validateBindName,
};
