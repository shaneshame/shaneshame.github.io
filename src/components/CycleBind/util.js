import { debounce } from 'lodash';

const MAX_CHARS_PER_LINE = 127;
const IDEAL_CHARS_PER_LINE = 82;
const MIN_ROWS = 10;

const countLines = text => (text ? text.split('\n').length : 0);

const alertLength = debounce(
  line => {
    alert(`Line greater than ${MAX_CHARS_PER_LINE} characters: ${line}`);
  },
  5000,
  {
    leading: true,
  }
);

const validateLines = lines => {
  lines.forEach(line => {
    if (line.length > MAX_CHARS_PER_LINE) {
      alertLength(line);
      return false;
    }
  });

  return true;
};

const createAliasName = (bindName, index) => {
  return index !== undefined ? `say${bindName}${index}` : `say${bindName}`;
};

const createSayCommand = (name, text) => {
  return `alias ${name} "say ${text}"`;
};

const createCycleBind = (lines, _bindName) => {
  const bindName = !_bindName || !_bindName.length ? 'CycleBind' : _bindName;
  const bindCommandName = `bind${bindName}`;

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
  IDEAL_CHARS_PER_LINE,
  MAX_CHARS_PER_LINE,
  MIN_ROWS,
  validateLines,
};
