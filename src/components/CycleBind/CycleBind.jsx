import clsx from 'clsx';
import { useClipboard } from 'hooks';
import { debounce, get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { JS_KEY_TO_TF2, media, stripSpaces, TF2_KEYS } from 'utils';

import {
  Button,
  ButtonLink,
  Checkbox,
  DetectButtonWindow,
  Header,
  Input,
  Label,
  P,
  Row,
  Select,
  SelectOption,
} from '../common';
import {
  CodeArea,
  Container,
  RulesItem,
  RulesList,
  Section,
  SectionHeader,
  SectionsContainer,
} from './components';
import {
  EXAMPLE_BIND,
  FONT_MAX,
  FONT_MIN,
  MOUSE_BUTTON_MAP,
} from './constants';
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
} from './util';

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

const getButtonName = (buttonCode = '') => {
  return (
    MOUSE_BUTTON_MAP[buttonCode] ||
    JS_KEY_TO_TF2[buttonCode] ||
    buttonCode.toUpperCase() ||
    undefined
  );
};

const CycleBind = () => {
  const [bindName, setBindName] = useState('');
  const [cycleText, setTextAreaValue] = useState(EXAMPLE_BIND);
  const [cycleScript, setCycleBind] = useState('');
  const [formErrors, setFormErrors] = useState({
    bindName: false,
  });
  const [settings, setSettings] = useState({
    ignoreEmptyLines: true,
    selectedKey: undefined,
    stripWhitespace: false,
  });
  const [isCapturing, setCapturing] = useState(false);
  const {
    clipboardStatus,
    copyToClipboard,
    setClipboardStatus,
  } = useClipboard();

  const setSetting = ({ name, value }) => {
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const getDownloadAttributes = debounce(
    contents => {
      const file =
        typeof Blob !== 'undefined' && contents && contents.length
          ? new Blob([contents], { type: 'text/plain' })
          : null;
      const url = file ? URL.createObjectURL(file) : '';
      const fileName = url
        ? stripSpaces(bindName)
          ? `${stripSpaces(bindName)}.cfg`
          : DEFAULT_FILENAME
        : 'empty';

      return {
        download: fileName,
        fileName,
        href: url,
        revoke: () => {
          url && URL.revokeObjectURL(url);
        },
      };
    },
    500,
    { leading: true }
  );

  const handleDetectButton = useCallback(
    button => {
      const selectedKey = getButtonName(button);
      setSettings({
        ...settings,
        selectedKey,
      });

      const timeoutId = setTimeout(() => {
        setCapturing(false);
        clearTimeout(timeoutId);
      }, 150);
    },
    [settings]
  );

  const handleTextAreaChange = e => {
    const text = e.target.value;
    setTextAreaValue(text);
    handleGenerateScript(text);
    setClipboardStatus();
  };

  const handleChangeBindName = e => {
    const newBindName = e.target.value;
    const validation = validateBindName(newBindName);
    setBindName(newBindName);
    setClipboardStatus();

    validation
      .then(() => {
        setFormErrors({
          ...formErrors,
          bindName: null,
        });
      })
      .catch(() => {
        setFormErrors({
          ...formErrors,
          bindName: 'Spaces will be ignored',
        });
      });
  };

  const handleGenerateScript = useCallback(
    text => {
      const fileContents = createCycleBind(text, bindName, settings);
      setCycleBind(fileContents);
    },
    [bindName, settings]
  );

  const handleCheckboxSetting = event => {
    const { name, checked } = event.target;
    setSetting({ name, value: checked });
  };

  const handleSelectSetting = event => {
    const { name, value } = event.target;
    setSetting({ name, value });
  };

  const handleCapture = () => {
    if (!isCapturing) {
      setCapturing(true);
    } else {
      setCapturing(false);
    }
  };

  const downloadAttrs = getDownloadAttributes(cycleScript);

  useEffect(() => {
    handleGenerateScript(cycleText);

    return () => {
      downloadAttrs.revoke();
    };
  }, [downloadAttrs, handleGenerateScript, cycleText]);

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

  return (
    <Container>
      <Header>CycleBind</Header>
      <Row
        css={`
          max-width: 625px;
        `}
      >
        <P>
          A cycle bind takes text that's too long for one message and breaks it
          into multiple messages. Each time the bind is pressed, the next part
          of the message is said.
        </P>
        <P>
          <strong
            css={`
              font-weight: 700;
            `}
          >
            Make sure you pause after each press.
          </strong>
          &nbsp;The game gives you a hidden cooldown between chat messages.
          Every time you press it, it moves on to the next message. If you press
          it too fast, you'll rotate past the next message you want to send.
        </P>
      </Row>
      <Row
        css={`
          border-top: 1px solid black;
        `}
      >
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
            error={get(formErrors, 'bindName')}
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
            margin-right: 20px;
          `}
          id="ignore-empty-lines"
          label="Ignore Empty Lines"
          name="ignoreEmptyLines"
          onChange={handleCheckboxSetting}
        />
        <Checkbox
          checked={settings.stripWhitespace}
          css={`
            display: inline-block;
          `}
          id="strip-whitespace"
          label="Strip Whitespace"
          name="stripWhitespace"
          onChange={handleCheckboxSetting}
        />
      </Row>
      <Row
        css={`
          margin-top: 10px;
        `}
      >
        <Select
          error={!settings.selectedKey}
          id="select-key"
          label="Select key to use*:"
          name="selectedKey"
          onChange={handleSelectSetting}
          value={settings.selectedKey}
        >
          <SelectOption value={undefined} />
          {TF2_KEYS.map(key => (
            <SelectOption key={key} value={key}>
              {key}
            </SelectOption>
          ))}
        </Select>
        <a
          css={`
            margin-left: 3px;
          `}
          href="https://wiki.teamfortress.com/wiki/Scripting#List_of_key_names"
          rel="noopener noreferrer"
          target="_blank"
        >
          (?)
        </a>
        <div
          css={`
            ${media.tablet} {
              align-items: center;
              display: inline-flex;
            }
          `}
        >
          <Button
            css={`
              height: 50px;
              margin: 5px 5px 0 0;
              width: 150px;

              ${media.tablet} {
                margin: 0 10px 0 20px;
              }
            `}
            onClick={handleCapture}
          >
            {isCapturing ? 'Stop capturing' : 'Auto-detect Key'}
          </Button>
          <span
            css={`
              font-size: 10px;
            `}
          >
            Note: Opens a new window
          </span>
        </div>
        <DetectButtonWindow
          isCapturing={isCapturing}
          onBlock={() => alert('Must enable popups to use auto-detect.')}
          onCancel={() => setCapturing(false)}
          onCapture={handleDetectButton}
        />
      </Row>
      <Row>
        <RulesList>
          <RulesItem>Each line will be a new message.</RulesItem>
          <RulesItem>
            Lines longer than {MAX_CHARS_PER_LINE} characters will be split into
            additional messages.
          </RulesItem>
          <RulesItem>
            For ASCII art, use {IDEAL_CHARS_PER_LINE} characters per line.
          </RulesItem>
        </RulesList>
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
          <SectionHeader
            css={`
              ${media.tablet} {
                display: inline-block;
                margin-right: 20px;
              }
            `}
          >
            Output
          </SectionHeader>
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
            Download as{' '}
            <code
              css={`
                margin-right: 6px;
              `}
            >
              cfg
            </code>
            <i className="fas fa-download" />
          </ButtonLink>
          <CodeArea
            css={`
              margin-top: 5px;

              ${media.tablet} {
                margin-top: 0;
              }
            `}
            fontSize={fontSize}
            id="cycle-script"
            placeholder="TF2 script output will appear here"
            readOnly
            rows={Math.max(MIN_ROWS, countLines(cycleScript))}
            value={cycleScript}
            wrap="off"
          />
          <div
            css={`
              margin-top: 10px;
            `}
          >
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
              Download as{' '}
              <code
                css={`
                  margin-right: 6px;
                `}
              >
                cfg
              </code>
              <i className="fas fa-download" />
            </ButtonLink>
          </div>
        </Section>
      </SectionsContainer>
    </Container>
  );
};

export default CycleBind;
