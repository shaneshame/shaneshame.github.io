import clsx from 'clsx';
import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Code,
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
  min-width: ${theme.floatingBoxDimensions.width}px;
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
`;

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  border: 1px solid ${theme.colors.pink};
  color: ${theme.colors.pink};
  display: flex;
  flex-direction: row;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  padding: 0.17em 0.25em 0.28em 0.25em;
  position: relative;
  text-transform: uppercase;
  transition: font-size ${transitionDuration} ease;

  & .spin-letter {
    display: inline-block;
    transition: transform ${transitionDuration} ease;
  }

  &.large,
  &:hover {
    font-size: 84px;

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
  color: ${theme.colors.aquaGreen};
  font-family: monospace, monospace;
  font-size: 19px;
  letter-spacing: -0.02rem;
  line-height: 1.625rem;
  margin: 0.1rem 0;
  padding: 0.35rem;
  text-align: center;
  text-transform: none;
  width: 100%;
`;

const InfoLabel = styled.h2`
  color: ${theme.colors.offWhite};
  display: block;
  margin: 0 0 0.5rem 0;
  padding: 0;
`;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
`;

const ContentBlock = styled.section`
  width: 310px;

  & > *:not(:nth-child(1)) {
    margin-top: 1rem;
  }
`;

const Footer = styled.footer`
  display: flex;
  font-size: 12px;
  justify-content: center;
  width: 256px;
  width: 310px;
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

const Chevron = styled.i`
  border-radius: 100%;
  color: ${theme.colors.gold};
  cursor: inherit;
  right: 0;
  position: absolute;
  top: 50%;
  transform: translate(67%, -50%);
`;

const ButtonLink = styled.button`
  background: ${theme.colors.darkGray};
  border: none;
  border: 1px solid ${theme.colors.goldPale};
  border-radius: 15px;
  color: ${theme.colors.gold};
  cursor: inherit;
  font-size: inherit;
  padding: 0;
  position: relative;
  width: 100%;

  &:hover {
    background: ${theme.colors.lightGray};
    box-shadow: 0 0 10px ${theme.colors.goldPale};

    ${Chevron} {
      box-shadow: 0 0 8px ${theme.colors.pink};
      color: ${theme.colors.pink};
    }
  }
`;

const TipContainer = styled.p`
  border-radius: 2px;
  color: inherit;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1;
  margin: 0;
  padding: 0.5rem 1.5rem 0.6rem;
  position: relative;
  text-align: center;
  width: 100%;
`;

const TipCommand = styled.span`
  display: inline-block;
  width: 100%;
`;

const Tip = ({ command, description, onClick }) => {
  return (
    <ButtonLink onClick={onClick}>
      <TipContainer>
        <TipCommand>
          Chat <Code>{command}</Code> to {description.toLowerCase()}.
        </TipCommand>
        <Chevron className="fas fa-chevron-circle-right fa-2x" />
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
          <Header>
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
