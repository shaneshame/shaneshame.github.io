import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, ButtonLink } from '../common';

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
  display: block;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  font-size: ${props => props.fontSize || 9}px;
  width: 40%;
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

  const Section = styled.section``;

  return (
    <Container>
      <Header>CycleBind</Header>
      <Label for="bind-name">Name for bind (optional):&nbsp;</Label>
      <Input
        id="bind-name"
        onChange={handleChangeBindName}
        type="text"
        value={bindName}
      />
      <Button
        css={`
          margin-left: 5px;
        `}
      >
        Copy <i className="fas fa-copy" />
      </Button>
      <ButtonLink
        download={downloadAttrs.download}
        href={downloadAttrs.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        Download <i className="fas fa-download" />
      </ButtonLink>
      <Section>
        <SectionHeader>Input</SectionHeader>
        <Label for="cycle-text">
          Each output on a new line. Max {MAX_CHARS_PER_LINE} characters per
          line. For art use {BEST_CHARS_PER_LINE}.
        </Label>
        <TextArea
          cols={120}
          fontSize={fontSize}
          id="cycle-text"
          onChange={handleTextAreaChange}
          rows={Math.max(MIN_ROWS, countLines(textAreaValue))}
          value={textAreaValue}
        />
      </Section>
      <Section>
        <SectionHeader>Output</SectionHeader>
        <Label
          css={`
            margin-top: 10px;
          `}
          for="cycle-script"
        >
          Replace `KEY` with the key you'll use:
        </Label>
        <TextArea
          fontSize={fontSize}
          id="cycle-script"
          readOnly
          rows={Math.max(MIN_ROWS, countLines(cycleBind))}
          value={cycleBind}
        />
      </Section>
    </Container>
  );
};

export default CycleBind;
