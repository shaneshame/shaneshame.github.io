import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import screenshot from '../Spoonman/spoonman.png';

const serverIP = '74.91.115.39';
const discordInviteLink = 'https://discord.gg/KH866DB';

/* eslint-disable sort-keys */
const unfurlData = {
  name: 'SPOONMAN | TF2',
  title: '[Chicago] Payload+',
  description: `Server IP: ${serverIP}\nDiscord: ${discordInviteLink}\n`,
  screenshot,
  url: 'https://shaneshame.github.io/Spoonman',
};
/* eslint-enable sort-keys */

export const windowSize = {
  height: 400,
  width: 400,
};

/* eslint-disable sort-keys */
const colors = {
  brown: '#A52A2A',
  darkBrown: '##661515',
  darkBlue: '#7289DA',
  darkBlueHover: '#677BC4',
  gray: '#8e9297',
  darkGray: '#2F3136',
  darkerGray: '#17181a',
  discordBlueLink: '#00B0F4',
  green: '#008000',
  darkGreen: '#005900',
  darkerGreen: '#013301',
  lightGray: '#36393F',
  pink: '#ffc0cb',
  white: '#FFFFFF',
};
/* eslint-enable sort-keys */

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
  color: ${colors.pink};
  height: ${windowSize.height}px;
  opacity: 0;
  padding: 1em;
  position: relative;
  width: ${windowSize.width}px;
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
  border: 1px solid ${colors.pink};
  color: ${colors.pink};
  margin: 0;
  padding: 0.5em 0 0.5em 0;
  position: relative;
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

const CodeInput = styled.input`
  background-color: ${colors.darkerGray};
  border: none;
  border-radius: 3px;
  color: inherit;
  font-family: monospace, monospace;
  font-size: 1rem;
  line-height: 1.625rem;
  margin: 0;
  padding: 0.35rem;
  text-align: center;
  text-transform: none;
  width: 16rem;
`;

const InfoLabel = styled.b`
  color: ${colors.gray};
  display: block;
  margin-bottom: 2px;
`;

const Link = styled.a`
  color: ${colors.discordBlueLink};
  display: inline-block;
  margin: 1em 0;
  text-transform: uppercase;
`;

const Label = styled.label`
  display: block;
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 0.9rem;
  margin: 0.75rem 0;
  text-transform: uppercase;

  &:first-of-type {
    margin: 0;
  }
`;

const MOTDUnfurlHeader = () => {
  return (
    <Helmet>
      <meta content={unfurlData.url} property="og:url" />
      <meta content={unfurlData.title} property="og:title" />
      <meta content={unfurlData.description} property="og:description" />
      <meta content={unfurlData.name} property="og:site_name" />
      <meta content={unfurlData.screenshot} property="og:image" />
    </Helmet>
  );
};

const Spoonman = () => {
  return (
    <Container>
      <MOTDUnfurlHeader />
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
            <CodeInput
              id="discordInviteLink"
              onClick={event => {
                event.target.select();
              }}
              readOnly
              value={discordInviteLink}
            />
          </Label>
          <Label htmlFor="serverIP">
            <InfoLabel>Server IP</InfoLabel>
            <CodeInput
              id="serverIP"
              onClick={event => {
                event.target.select();
              }}
              readOnly
              value={serverIP}
            />
          </Label>
        </ContentContainer>
      </InnerBox>
    </Container>
  );
};

export default Spoonman;
