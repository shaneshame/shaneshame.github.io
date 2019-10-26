import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, ButtonLink } from '../common';
import {
  countLines,
  createCycleBind,
  IDEAL_CHARS_PER_LINE,
  MAX_CHARS_PER_LINE,
  MIN_ROWS,
  validateLines,
} from './util';

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
  overflow: auto;
  width: 100%;
`;

const Section = styled.section`
  &:not(:first-of-type) {
    margin-left: 20px;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
`;

const GuideList = styled.ul``;

const GuideItem = styled.li`
  margin: 0;
`;

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
      <Label htmlFor="bind-name">Name for bind (optional):&nbsp;</Label>
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
      <SectionsContainer>
        <Section
          css={`
            flex: 2 0 auto;
            max-width: 40%;
          `}
        >
          <SectionHeader>Input</SectionHeader>
          <GuideList>
            <GuideItem>Each output on a new line.</GuideItem>
            <GuideItem>
              {' '}
              Max {MAX_CHARS_PER_LINE} characters per line.
            </GuideItem>
            <GuideItem>
              For ASCII art, use {IDEAL_CHARS_PER_LINE} characters per line.
            </GuideItem>
          </GuideList>
          <TextArea
            cols={120}
            fontSize={fontSize}
            onChange={handleTextAreaChange}
            rows={Math.max(MIN_ROWS, countLines(textAreaValue))}
            value={textAreaValue}
            wrap="off"
          />
        </Section>
        <Section
          css={`
            flex: 1 3 auto;
          `}
        >
          <SectionHeader>Output</SectionHeader>
          <GuideList>
            <GuideItem>Replace `KEY` with the key you'll use.</GuideItem>
          </GuideList>
          <TextArea
            fontSize={fontSize}
            id="cycle-script"
            placeholder="TF2 Script Output Will Appear Here"
            readOnly
            rows={Math.max(MIN_ROWS, countLines(cycleBind))}
            value={cycleBind}
            wrap="off"
          />
        </Section>
      </SectionsContainer>
    </Container>
  );
};

export default CycleBind;
