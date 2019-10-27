import clsx from 'clsx';
import { useClipboard } from 'hooks';
import { debounce, get } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { media } from 'utils';

import { Button, ButtonLink, Checkbox, Input, TextArea } from '../common';
import {
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
} from './util';

const FONT_MIN = 9;
const FONT_MAX = 13;

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

// const EXAMPLE_BIND = `This is a test
// to see

// empty lines
// and stuff`;

const P = styled.p``;

const Container = styled.div`
  position: relative;
`;

const Header = styled.h1`
  margin: 0 0 15px 0;
`;

const SectionHeader = styled.h3`
  /* border-bottom: 1px solid hsla(0, 0%, 0%, 0.07); */
  margin: 0 0 10px 0;
`;

const Label = styled.label`
  display: block;
`;

const CodeArea = styled(TextArea)`
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  font-size: ${props => props.fontSize || 9}px;
  width: 100%;
`;

const SectionsContainer = styled.div`
  ${media.tablet} {
    display: flex;
    margin-top: 20px;
  }
`;

const Section = styled.section`
  ${media.tablet} {
    &:not(:first-of-type) {
      margin-left: 20px;
    }
  }
`;

const RulesList = styled.ul`
  ${media.tablet} {
    ${props => props.height && `height: ${props.height}px;`}
  }
`;

const RulesItem = styled.li`
  margin: 0;
`;

const Row = styled.div`
  margin-top: 20px;
`;

const CopyButton = ({ className, clipboardStatus, disabled, onClick }) => {
  return (
    <Button
      className={clsx(className, {
        error: clipboardStatus === false,
        success: clipboardStatus === true,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      Copy&nbsp;
      <i
        className={clsx('fas', {
          'fa-check': clipboardStatus === true,
          'fa-copy': clipboardStatus === undefined,
          'fa-times': clipboardStatus === false,
        })}
      />
    </Button>
  );
};

const CycleBind = () => {
  const [bindName, setBindName] = useState('');
  const [cycleText, setTextAreaValue] = useState(EXAMPLE_BIND);
  const [cycleScript, setCycleBind] = useState('');
  const [rulesHeight, setRulesHeight] = useState();
  const [formErrors, setFormErrors] = useState({
    bindName: null,
    cycleScript: null,
    cycleText: null,
  });
  const [settings, setSettings] = useState({
    ignoreEmptyLines: true,
  });
  const inputRulesRef = useRef(null);
  const outputRulesRef = useRef(null);

  const {
    clipboardStatus,
    copyToClipboard,
    setClipboardStatus,
  } = useClipboard();

  const updateRulesHeight = () => {
    if (inputRulesRef.current && outputRulesRef.current) {
      setRulesHeight(
        Math.max(
          inputRulesRef.current.clientHeight,
          outputRulesRef.current.clientHeight
        )
      );
    }
  };

  const getDownloadAttributes = debounce(
    contents => {
      const file =
        typeof Blob !== 'undefined' && contents && contents.length
          ? new Blob([contents], { type: 'text/plain' })
          : null;
      const url = file ? URL.createObjectURL(file) : '';
      const fileName = url
        ? bindName
          ? `${bindName.toLowerCase()}.cfg`
          : DEFAULT_FILENAME
        : 'empty';

      return {
        download: fileName,
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
    const isValid = validateCycleText(text);

    if (isValid) {
      setFormErrors({
        ...formErrors,
        cycleText: null,
      });
      handleGenerateScript(text);
    } else {
      setFormErrors({
        ...formErrors,
        cycleText: `Max line length is ${MAX_CHARS_PER_LINE}.`,
      });
    }

    setTextAreaValue(text);

    setClipboardStatus();
  };

  const handleChangeBindName = e => {
    const newBindName = e.target.value;
    const validation = validateBindName(newBindName);

    validation
      .then(() => {
        setFormErrors({
          ...formErrors,
          bindName: null,
        });
      })
      .catch(error => {
        setFormErrors({
          ...formErrors,
          bindName: error,
        });
      })
      .finally(() => {
        setBindName(newBindName);
        setClipboardStatus();
      });
  };

  const handleGenerateScript = useCallback(
    text => {
      if (!formErrors.cycleText) {
        const fileContents = createCycleBind(text, bindName, settings);
        setCycleBind(fileContents);
      }
    },
    [bindName, formErrors.cycleText, settings]
  );

  const longestLineLength = cycleText
    ? getLines(cycleText).reduce((result, line) => {
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

  const setSetting = ({ name, value }) => {
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const downloadAttrs = getDownloadAttributes(cycleScript);

  useEffect(() => {
    handleGenerateScript(cycleText);
    updateRulesHeight();

    return () => {
      downloadAttrs.revoke();
    };
  }, [downloadAttrs, handleGenerateScript, cycleText]);

  return (
    <Container>
      <Header>CycleBind</Header>
      <Row
        css={`
          border-bottom: 1px solid black;
        `}
      >
        <P>
          A cycle bind takes text that's too long for one message and breaks it
          into multiple messages. Each time the bind is pressed, the next part
          of the message is said.
        </P>
        <P>
          <span
            css={`
              font-weight: 700;
            `}
          >
            Make sure you pause after each press.
          </span>
          &nbsp;The game gives you a hidden cooldown between chat messages.
          Every time you press it, it moves on to the next message. If you press
          it too fast, you'll rotate past the next message you want to send.
        </P>
      </Row>
      <Row>
        <SectionHeader>Controls</SectionHeader>
        <div
          css={`
            display: inline-block;
            margin-right: 20px;
          `}
        >
          <Label
            css={`
              display: inline-block;
              margin-right: 10px;
            `}
            htmlFor="bind-name"
          >
            Name for bind (optional):
          </Label>
          <Input
            error={get(formErrors, 'bindName.message')}
            id="bind-name"
            onChange={handleChangeBindName}
            placeholder={DEFAULT_BINDNAME}
            type="text"
            value={bindName}
          />
        </div>
        <Checkbox
          checked={settings.ignoreEmptyLines}
          css={`
            display: inline-block;
          `}
          id="ignore-empty-lines"
          label="Ignore Empty Lines"
          name="ignoreEmptyLines"
          onChange={setSetting}
        />
      </Row>
      <Row>
        <CopyButton
          clipboardStatus={clipboardStatus}
          disabled={!cycleScript}
          onClick={() => copyToClipboard(cycleScript)}
        />
        <ButtonLink
          disabled={!cycleScript}
          download={downloadAttrs.download}
          href={downloadAttrs.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          Download&nbsp;
          <i className="fas fa-download" />
        </ButtonLink>
      </Row>
      <SectionsContainer>
        <Section
          css={`
            max-width: 100%;

            ${media.tablet} {
              flex: 2 0 auto;
              max-width: 40%;
            }
          `}
        >
          <SectionHeader>Input</SectionHeader>
          <RulesList height={rulesHeight} ref={inputRulesRef}>
            <RulesItem>Each output on a new line.</RulesItem>
            <RulesItem>Max {MAX_CHARS_PER_LINE} characters per line.</RulesItem>
            <RulesItem>
              For ASCII art, use {IDEAL_CHARS_PER_LINE} characters per line.
            </RulesItem>
          </RulesList>
          <CodeArea
            cols={120}
            fontSize={fontSize}
            onChange={handleTextAreaChange}
            placeholder="Enter text to print here"
            rows={Math.max(MIN_ROWS, countLines(cycleText))}
            value={cycleText}
            wrap="off"
          />
        </Section>
        <Section
          css={`
            ${media.tablet} {
              flex: 1 3 auto;
            }
          `}
        >
          <SectionHeader>Output</SectionHeader>
          <RulesList height={rulesHeight} ref={outputRulesRef}>
            <RulesItem>
              Replace `KEY` with the name of the key you'll use.
            </RulesItem>
            <RulesItem>
              The names of the keys&nbsp;
              <a href="https://wiki.teamfortress.com/wiki/Scripting#List_of_key_names">
                can be found here
              </a>
              .
            </RulesItem>
          </RulesList>
          <CodeArea
            fontSize={fontSize}
            id="cycle-script"
            placeholder="TF2 script output will appear here"
            readOnly
            rows={Math.max(MIN_ROWS, countLines(cycleScript))}
            value={cycleScript}
            wrap="off"
          />
        </Section>
      </SectionsContainer>
    </Container>
  );
};

export default CycleBind;
