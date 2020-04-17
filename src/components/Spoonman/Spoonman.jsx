import clsx from 'clsx';
import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Code,
  ContentContainer,
  DISCORD_INVITE_LINK,
  SERVER_COMMANDS,
  SERVER_IP,
  theme,
} from './common';
import Helmet from './Helmet';
import ServerCommands from './ServerCommands';

const FullBrowserWindow = styled.div`
  background-color: ${theme.colors.lightGray};
  font-size: 16px;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
  position: relative;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const MainBox = styled.div`
  background: ${theme.colors.darkGray};
  border-radius: 10px;
  box-shadow: 20px 20px 47px ${theme.colors.darkerGray},
    -20px -20px 47px #474a52;
  box-sizing: border-box;
  color: ${theme.colors.pink};
  height: ${theme.floatingBoxDimensions.height}px;
  padding: 1rem;
  position: relative;
  width: ${theme.floatingBoxDimensions.width}px;
  transition: transform 0.4s ease;
  transform: translate(50%, -50%);
  top: 45%;

  &.isSideOpen {
    transform: translate(0, -50%);
  }
`;

const SideBox = styled(MainBox)`
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.6s ease;
  transform: translate(50%, -50%);

  &.isSideOpen {
    transform: translate(0, -50%);
    opacity: 1;
  }
`;

const transitionDuration = '0.4s';

const Header = styled.header`
  margin: 0 auto;
  transition: width ${transitionDuration} ease;
  width: 90;
`;

const Title = styled.h1`
  border: 1px solid ${theme.colors.pink};
  color: ${theme.colors.pink};
  display: flex;
  flex-direction: column;
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  padding: 0.5rem 0.5rem calc(0.5rem + 2px) 0.5rem;
  position: relative;
  text-transform: uppercase;
  transition: font-size ${transitionDuration} ease,
    line-height ${transitionDuration} ease;

  & .spin-letter {
    display: inline-block;
    transition: transform ${transitionDuration} ease;
  }

  &.large,
  &:hover {
    font-size: 128px;
    line-height: 1;
    width: 100%;

    .letter {
      text-shadow: 1px 1px 1px #000;
    }

    .spin-letter {
      transform: scaleX(-1);
    }
  }
`;

const FlexControl = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const CodeInput = styled.input`
  background-color: ${theme.colors.darkerGray};
  border: none;
  border-radius: 3px;
  color: inherit;
  font-family: monospace, monospace;
  font-size: 1rem;
  letter-spacing: -0.02rem;
  line-height: 1.625rem;
  margin: 0.1rem 0;
  padding: 0.35rem;
  text-align: center;
  text-transform: none;
  width: 16rem;
`;

const InfoLabel = styled.b`
  color: ${theme.colors.offWhite};
  display: block;
  font-size: 1rem;
`;

const ContentBlock = styled.section`
  /* margin: 0.75rem 0; */
`;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
`;

const Footer = styled.footer`
  align-self: center;
  display: flex;
  font-size: 14px;
  justify-content: center;
  width: 256px;
`;

const ClickBait = styled.span`
  color: ${theme.colors.aquaGreen};
  cursor: inherit;
  margin-left: 0.5rem;
`;

const TipContainer = styled.p`
  border-radius: 2px;
  box-shadow: 0 0 10px ${theme.colors.goldPale};
  color: inherit;
  cursor: pointer;
  margin: 0;
  padding: 0.5rem 1.5rem;
`;

// const Info = styled.div`
//   background: ${props => props.background || 'inherit'};
//   border: 1px solid white;
//   border-radius: 100%;
//   height: 1.5em;
//   line-height: 1.3;
//   position: absolute;
//   text-align: center;
//   transform: translate(0.5em, -50%);
//   width: 1.5em;
// `;

const ButtonLink = styled.button`
  background: ${theme.colors.darkGray};
  border: none;
  color: ${theme.colors.white};
  cursor: inherit;
  font-size: inherit;
  font-weight: 600;
  padding: 0;
  position: relative;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${theme.colors.lightGray};
    color: ${theme.colors.gold};

    ${ClickBait} {
      /* color: ${theme.colors.discordBlueLink}; */
    }
  }
`;

const Tip = ({ command, description, onClick }) => {
  return (
    <ButtonLink onClick={onClick}>
      <TipContainer>
        <Code>{command}</Code> will {description.toLowerCase()} -
        <ClickBait>See More</ClickBait>
      </TipContainer>
    </ButtonLink>
  );
};

const Spoonman = () => {
  const [isSideOpen, setSideOpen] = useState(false);
  const tip = SERVER_COMMANDS[0];

  return (
    <FullBrowserWindow>
      <Helmet />
      <MainBox className={clsx('main', { isSideOpen })}>
        <ContentContainer>
          <Header className={clsx({ large: false })}>
            <Title className={clsx({ large: false })}>
              <FlexControl>
                {'Spoon'.split('').map((letter, index) => (
                  <span className="letter spin-letter" key={index}>
                    {letter}
                  </span>
                ))}
              </FlexControl>
              <FlexControl>
                {'man'.split('').map((letter, index) => (
                  <span className="letter" key={index}>
                    {letter}
                  </span>
                ))}
              </FlexControl>
            </Title>
          </Header>
          <ContentBlock>
            <Label htmlFor="DISCORD_INVITE_LINK">
              <InfoLabel>Discord</InfoLabel>
              <CodeInput
                id="DISCORD_INVITE_LINK"
                onClick={event => {
                  event.target.select();
                }}
                readOnly
                value={DISCORD_INVITE_LINK}
              />
            </Label>
            <Label htmlFor="SERVER_IP">
              <InfoLabel>Server IP</InfoLabel>
              <CodeInput
                id="SERVER_IP"
                onClick={event => {
                  event.target.select();
                }}
                readOnly
                value={SERVER_IP}
              />
            </Label>
          </ContentBlock>
          <Footer>
            <Tip
              command={tip.command}
              description={tip.description}
              onClick={() => {
                setSideOpen(!isSideOpen);
              }}
            />
          </Footer>
        </ContentContainer>
      </MainBox>
      <SideBox className={clsx({ isSideOpen })}>
        <ServerCommands />
      </SideBox>
    </FullBrowserWindow>
  );
};

export default Spoonman;
