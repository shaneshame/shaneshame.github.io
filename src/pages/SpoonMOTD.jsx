import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const discordInviteLink = 'https://discord.gg/KH866DB';

const colors = {
  brown: '#A52A2A',
  darkBrown: '##661515',
  darkBlue: '#7289DA',
  darkBlueHover: '#677BC4',
  darkGray: '#2F3136',
  darkerGray: '#17181a',
  discordBlueLink: '#00B0F4',
  green: '#008000',
  darkGreen: '#005900',
  darkerGreen: '#013301',
  lightGray: '#36393F',
  white: '#FFFFFF',
};

const Container = styled.div`
  background-color: ${colors.lightGray};
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 16px;
  height: 100vh;
  overflow-y: hidden;
  position: relative;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const InnerBox = styled.div`
  background: ${colors.darkGray};
  border-radius: 10px;
  box-shadow: 20px 20px 47px ${colors.darkerGray}, -20px -20px 47px #474a52;
  box-sizing: border-box;
  color: ${colors.green};
  height: 400px;
  left: 50%;
  margin: 0 auto;
  padding: 1em;
  position: absolute;
  width: 400px;
  top: 45%;
  transform: translate(-50%, -50%);

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  text-align: center;
  left: 50%;
  top: calc(50% - 0.5em);
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  margin: 0;
  padding: 0.5em 0 0.5em 0;
  text-transform: uppercase;

  span {
    display: inline-block;
    transition: transform 0.4s ease;
  }

  &:hover {
    span {
      filter: FlipH;
      transform: scaleX(-1);
    }
  }
`;

const codeStyles = `
  background-color: ${colors.darkerGray};
  border: none;
  color: inherit;
  font-family: monospace, monospace;
  font-size: 0.85rem;
  line-height: 1.625rem;
  margin-top: .75rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
  width: 14rem;
`;

const CodeInput = styled.input`
  ${codeStyles}
`;

const Code = styled.pre`
  ${codeStyles}
`;

const Link = styled.a`
  color: ${colors.discordBlueLink};
  display: inline-block;
  margin: 1em 0;
  text-transform: uppercase;
`;

const LinkButton = styled.button`
  background-color: ${colors.darkBlue};
  border: none;
  border-radius: 3px;

  color: ${colors.white};
  cursor: pointer;
  display: inline-block;
  font-family: Impact, Charcoal, sans-serif;
  font-size: 23px;
  letter-spacing: 1.5px;
  margin-top: 1em;
  padding: 0.75em 1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.1s ease, box-shadow 0.2s ease;
  width: 8.5em;

  &:hover {
    background-color: ${colors.darkBlueHover};
    box-shadow: 0 12px 12px -6px ${colors.darkerGray}, 0 0 6px #474a52;
    text-decoration: none;
  }

  &.success {
    background-color: ${colors.darkGreen};

    &:hover {
      background-color: ${colors.darkerGreen};
      box-shadow: 0 12px 12px -6px ${colors.darkerGray}, 0 0 6px #474a52;
      text-decoration: none;
    }
  }

  &.error {
    background-color: ${colors.brown};

    &:hover {
      background-color: ${colors.darkBrown};
      box-shadow: 0 12px 12px -6px ${colors.darkerGray}, 0 0 6px #474a52;
      text-decoration: none;
    }
  }
`;

const writeToClipboard = text => {
  return navigator.clipboard.writeText(text).then(
    () => {
      console.log('Text copied to clipboard');
    },
    err => {
      // This can happen if the user denies clipboard permissions:
      console.error('Could not copy text: ', err);
    }
  );
};

const handleCopyToClipboard = text => {
  return navigator.permissions
    .query({ name: 'clipboard-write' })
    .then(result => {
      if (result.state === 'granted' || result.state === 'prompt') {
        return writeToClipboard(text);
      }
    });
};

const MOTD = () => {
  const [isSSR, setSSR] = useState(true);
  const [copyLinkState, setCopyLinkState] = useState();

  const handleCopyLink = () => {
    handleCopyToClipboard(discordInviteLink)
      .then(() => {
        setCopyLinkState('success');
      })
      .catch(() => {
        setCopyLinkState('error');
      });
  };

  useEffect(() => {
    setSSR(false);
  }, []);

  return (
    <Container>
      <InnerBox>
        <ContentContainer>
          <Title>
            {'Spoon'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
            man
          </Title>
          <Link href="https://paste.ubuntu.com/p/PN94TXyhbw/">
            Don't be an asshole
          </Link>
          <LinkButton
            className={clsx({ [copyLinkState]: !!copyLinkState })}
            onClick={handleCopyLink}
          >
            {!copyLinkState
              ? 'Join Discord'
              : copyLinkState === 'success'
              ? 'Link Copied'
              : 'Copy Failed'}
          </LinkButton>
          {isSSR ? (
            <Code>{discordInviteLink}</Code>
          ) : (
            <CodeInput
              onClick={event => {
                event.target.select();
              }}
              value={discordInviteLink}
            />
          )}
        </ContentContainer>
      </InnerBox>
    </Container>
  );
};

export default MOTD;
