import { Link } from 'gatsby';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const countLines = text => (text ? text.split('\n').length : 0);

const MAX_CHARS_PER_LINE = 127;
const BEST_CHARS_PER_LINE = 82;
const MIN_ROWS = 10;

const alertLength = debounce(
  line => {
    alert(`Line greater than ${MAX_CHARS_PER_LINE} characters: ${line}`);
  },
  5000,
  {
    leading: true,
  }
);

const EXAMPLE_BIND = `⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⠞⠋⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠉⠳⢄
⢀⢀⢀⢀⢀⢀⢀⢀⣶⠉⢀⢀⢀⣀⣀⣀⣀⢀⢀⢀⢀⢀⢀⣀⣀⣀⣀⡀⢀⢀⠈⣶
⢀⢀⢀⢀⢀⢀⢀⢀⣿⢀⢰⣿⣿⣿⠿⢿⣿⣿⢀⢀⢀⢀⣿⣿⡿⠿⣿⣿⣿⡆⢀⣿
⢀⢀⢀⢀⢀⢀⢀⢀⠉⢶⡈⠛⠻⠿⠶⢾⡿⠉⢀⣶⣶⡀⠉⢿⡷⠶⠿⠟⠛⢁⡰⠉
⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⠁⣀⣰⣦⣉⡁⢀⢀⠘⠛⠛⠃⢀⢀⠈⢉⣰⣦⣀⠈⢳
⢀⢀⢀⢀⢀⢀⣠⠤⠴⣿⡄⠉⠙⠣⣿⡙⠒⣶⠒⣶⠒⠒⣶⠒⢲⣏⠟⠋⠉⢠⡾⠓⠒⠢⣀
⢀⢀⢀⢀⠠⣟⣤⣤⣄⣈⡙⠓⢤⣄⣀⡈⠉⠛⠒⠛⠒⠒⠛⠚⢉⣁⣠⣤⠾⠁⢀⣤⣾⣯⠲⢄⡀
⢀⢀⢀⣠⢼⣿⣿⣿⡿⣿⣿⣦⣬⡙⠻⠿⣿⣟⠛⠛⠛⢛⣿⣿⠿⠿⢋⣉⣠⣼⣿⠿⣻⣿⣷⣬⡿⣀
⢀⡰⣏⣾⣿⣿⣿⣿⡇⣿⣿⣿⣿⡇⠿⠇⣶⣿⠓⠒⠲⢾⡷⠰⠆⣿⣿⣿⣿⡿⠟⢀⣿⣿⣿⣿⣷⣬⠱⣆
⣾⠃⣿⣿⣿⣿⣿⣿⣇⣬⣷⣶⣶⣶⢻⣷⠟⣿⢀⢀⢀⢸⡇⣾⡇⣿⢿⣿⣤⣶⣾⡀⢿⣿⣿⣿⣿⣿⡆⣿
⠙⠢⣍⠻⢿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣰⢞⡃⣿⢀⢀⢀⢸⡇⣛⢣⡟⣼⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⠿⢃⡿
⢀⢀⢀⠙⢦⣄⣿⡇⠻⢿⣿⣿⣿⣿⣿⠸⠃⠿⢶⣶⣶⣾⣃⠟⢰⣿⣿⣿⣿⣿⡿⠋⣸⡿⠿⣯⣥⠞⠁
⢀⢀⢀⢀⢀⠉⠙⠛⠦⣤⣬⣭⣭⣭⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⡦⣴⠋⠙⠛⠁
⢀⢀⢀⢀⢀⢀⢀⢰⡏⣾⡟⠃⣼⣿⣿⣿⣿⣿⣿⣟⢿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣷⠉⡆
⢀⢀⢀⢀⢀⢀⢀⡼⣧⣿⠇⣠⣿⣿⣿⣿⣿⣿⡇⣿⣼⢿⣿⣿⣿⡇⠈⣿⣿⣿⣿⣶⢳⡄
⢀⢀⢀⢀⢀⢀⢸⡇⣿⣿⢀⣿⣿⣿⣿⣿⣿⣿⢰⡏⣿⢸⣿⣿⣿⣷⢀⣿⣿⣿⣿⣿⢸⡇
⢀⢀⢀⢀⢀⢀⠈⠳⠶⠶⠶⣿⣿⣿⣿⣿⣿⣿⠞⠁⠻⢾⣿⣿⣿⣿⣤⣤⣿⡿⠶⠶⠞⠃
⢀⢀⢀⢀⢀⡤⠚⠉⠉⠙⠒⠯⣉⠉⣶⢀⢀⢀⢀⢀⢀⢀⢀⣼⠃⠉⠉⠉⣩⠽⠖⠚⠉⠉⠒⠢⣄
⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⠤⠔⠒⠊⠉⠉⠉⠉⠉⠉⠉⠉⠑⠒⠢⠤⣀`;

const Container = styled.div`
  position: relative;
`;

const Header = styled.h1`
  margin: 0 0 15px 0;
`;

const SectionHeader = styled.h3`
  margin: 10px 0;
`;

const Input = styled.input`
  margin: 0 0 0 0;
`;

const Label = styled.label`
  display: block;
`;

const TextArea = styled.textarea`
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  font-size: ${props => props.fontSize || 9}px;
  width: 100%;
`;

const Button = styled.button`
  box-shadow: 0px 2px 2px 0px black;
  margin: 5px 0;
  padding: 2px 10px;
`;

const LinkButton = styled.a`
  background-image: linear-gradient(#f0f0f0, rgb(221, 221, 221));
  border: 1px outset rgb(221, 221, 221);
  box-shadow: 0px 2px 2px 0px black;
  color: #000;
  cursor: pointer;
  display: inline-block;
  height: 34px;
  margin-left: 5px;
  padding: 2px 10px;
  text-decoration: none;

  &:hover {
    background-image: linear-gradient(#dddddd, #cccccc);
  }
`;

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

const CycleBind = () => {
  const [textAreaValue, setTextAreaValue] = useState(EXAMPLE_BIND);
  const [bindName, setBindName] = useState('');
  const [cycleBind, setCycleBind] = useState('');

  const getDownloadAttributes = debounce(
    contents => {
      const file =
        typeof Blob !== 'undefined'
          ? new Blob([contents], { type: 'text/plain' })
          : null;
      const url = file ? URL.createObjectURL(file) : '';

      return {
        download: bindName ? `${bindName.toLowerCase()}.cfg` : 'cyclebind.cfg',
        href: url,
        revoke: () => {
          url && URL.revokeObjectURL(url);
        },
      };
    },
    500,
    { leading: true }
  );

  const handleTextAreaChange = e => {
    const text = e.target.value;
    setTextAreaValue(text);
    handleGenerateScript(text);
  };

  const handleChangeBindName = e => {
    setBindName(e.target.value);
  };

  const handleGenerateScript = useCallback(
    textAreaContents => {
      const lines = textAreaContents ? textAreaContents.split('\n') : [];
      const isValid = validateLines(lines);

      if (isValid) {
        const fileContents = createCycleBind(lines, bindName);
        setCycleBind(fileContents);
      }
    },
    [bindName]
  );

  const FONT_MIN = 9;
  const FONT_MAX = 13;
  const longestLineLength = textAreaValue
    ? textAreaValue.split('\n').reduce((result, line) => {
        return Math.max(result, line.length);
      }, 0)
    : 0;

  const fontSize = Math.max(
    FONT_MIN,
    Math.min(
      FONT_MAX,
      FONT_MIN + FONT_MAX - (FONT_MAX * longestLineLength) / MAX_CHARS_PER_LINE
    )
  );

  const downloadAttrs = getDownloadAttributes(cycleBind);

  useEffect(() => {
    handleGenerateScript(textAreaValue);

    return () => {
      downloadAttrs.revoke();
    };
  }, [downloadAttrs, handleGenerateScript, textAreaValue]);

  return (
    <Container>
      <Header>CycleBind</Header>
      <Label>
        Name for bind (optional):&nbsp;
        <Input onChange={handleChangeBindName} type="text" value={bindName} />
      </Label>
      <SectionHeader>Input</SectionHeader>
      <Label>
        Each output on a new line. Max {MAX_CHARS_PER_LINE} characters per line.
        For art use {BEST_CHARS_PER_LINE}.
        <TextArea
          cols={120}
          fontSize={fontSize}
          onChange={handleTextAreaChange}
          rows={Math.max(MIN_ROWS, countLines(textAreaValue))}
          value={textAreaValue}
        />
      </Label>
      <LinkButton
        download={downloadAttrs.download}
        href={downloadAttrs.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        Download .cfg file
      </LinkButton>
      <SectionHeader>Output</SectionHeader>
      <Label
        css={`
          margin-top: 10px;
        `}
      >
        Replace `KEY` with the key you'll use:
        <TextArea
          fontSize={fontSize}
          readOnly
          rows={Math.max(MIN_ROWS, countLines(cycleBind))}
          value={cycleBind}
        />
      </Label>
    </Container>
  );
};

export default CycleBind;
