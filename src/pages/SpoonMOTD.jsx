import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const serverIP = '74.91.115.39';
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
  display: flex;
  height: 100vh;
  justify-content: center;
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
  opacity: 0;
  padding: 1em;
  position: relative;
  width: 400px;
  top: 45%;
  transition: opacity 0.2s ease;
  transform: translateY(-50%);

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  &.isOpen {
    opacity: 1;
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
  cursor: pointer;
  font-family: monospace, monospace;
  font-size: 1rem;
  line-height: 1.625rem;
  padding: 0.25rem;
  text-align: center;
  width: 16rem;
`;

const CodeInput = styled.input`
  ${codeStyles}
`;

const Code = styled.pre`
  ${codeStyles}
`;

const InfoLabel = styled.b`
  color: ${colors.darkBlue};
`;

const Link = styled.a`
  color: ${colors.discordBlueLink};
  display: inline-block;
  margin: 1em 0;
  text-transform: uppercase;
`;

const Label = styled.label`
  display: block;
  letter-spacing: 1px;
  margin: 0.75rem 0;
  text-transform: uppercase;
`;

const MOTD = () => {
  const [isSSR, setSSR] = useState(true);

  useEffect(() => {
    setSSR(false);
  }, []);

  return (
    <Container>
      <InnerBox className="isOpen">
        <ContentContainer>
          <Title>
            {'Spoon'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
            man
          </Title>
          <Link>Don't be an asshole</Link>
          <Label htmlFor="discordInviteLink">
            <InfoLabel>Discord</InfoLabel>
            {isSSR ? (
              <Code id="discordInviteLink">{discordInviteLink}</Code>
            ) : (
              <CodeInput
                id="discordInviteLink"
                onClick={event => {
                  event.target.select();
                }}
                readOnly
                value={discordInviteLink}
              />
            )}
          </Label>
          <Label htmlFor="serverIP">
            <InfoLabel>Server IP</InfoLabel>
            {isSSR ? (
              <Code id="serverIP">{serverIP}</Code>
            ) : (
              <CodeInput
                id="serverIP"
                onClick={event => {
                  event.target.select();
                }}
                readOnly
                value={serverIP}
              />
            )}
          </Label>
        </ContentContainer>
      </InnerBox>
    </Container>
  );
};

export default MOTD;
