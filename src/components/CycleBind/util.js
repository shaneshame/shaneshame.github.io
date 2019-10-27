import { isEmpty } from 'lodash';
import { pascalCase } from 'utils';
import * as yup from 'yup';

const DEFAULT_BINDNAME = 'MyAwesomeBind';
const DEFAULT_FILENAME = 'cyclebind.cfg';
const IDEAL_CHARS_PER_LINE = 82;
const MAX_CHARS_PER_LINE = 127;
const MIN_ROWS = 10;

const getLines = text => (text ? text.split('\n') : []);
const countLines = text => getLines(text).length;

const bindNameSchema = yup.string().matches(/^\S+$/, {
  excludeEmptyString: true,
  message: 'Bind name cannot contain spaces.',
});

const validateBindName = bindName => {
  return bindNameSchema.validate(bindName);
};

const validateCycleText = text => {
  const lines = getLines(text);

  lines.forEach(line => {
    if (line.length > MAX_CHARS_PER_LINE) {
      return false;
    }
  });

  return true;
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

const isEmptyLine = line => line.trim().length;

// const breakLinesAt = ()

const processText = (text, settings = {}) => {
  const { ignoreEmptyLines, stripWhitespace = true } = settings;
  let lines = getLines(text);

  if (ignoreEmptyLines) {
    lines = lines.filter(isEmptyLine);
  }

  // if (stripWhitespace) {
  //   lines
  // }

  // lines = breakLinesAt(lines, MAX_CHARS_PER_LINE);

  return lines;
};

const createCycleBind = (text, _bindName, settings) => {
  const lines = processText(text, settings);
  const bindName =
    !_bindName || !_bindName.length ? DEFAULT_BINDNAME : _bindName;
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

bind KEY ${bindCommandName}

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
  validateCycleText,
};
