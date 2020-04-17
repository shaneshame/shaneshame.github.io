import React from 'react';
import styled from 'styled-components';

import {
  Code,
  ContentContainer,
  DISCORD_INVITE_LINK,
  InnerBox,
  SERVER_COMMANDS,
  SERVER_IP,
  theme,
} from './common';

const Title = styled.h1`
  border: 1px solid ${theme.colors.pink};
  color: ${theme.colors.pink};
  font-size: 3em;
  margin: 0;
  padding: 0.5em 0 calc(0.5em + 2px) 0;
  position: relative;
  text-transform: uppercase;

  & > .letter {
    display: inline-block;
    transition: transform 0.4s ease;
  }

  &:hover > .letter {
    transform: scaleX(-1);
  }
`;

const CodeInput = styled.input`
  background-color: ${theme.colors.darkerGray};
  border: none;
  border-radius: 3px;
  color: inherit;
  font-family: monospace, monospace;
  font-size: 1em;
  letter-spacing: -0.02em;
  line-height: 1.625em;
  margin: 0.1em 0;
  padding: 0.35em;
  text-align: center;
  text-transform: none;
  width: 16em;
`;

const InfoLabel = styled.b`
  color: ${theme.colors.offWhite};
  display: block;
  font-size: 1em;
`;

const ContentBlock = styled.section`
  /* margin: 0.75em 0; */
`;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
`;

const TipContainer = styled.p`
  border: 2px solid ${theme.colors.lightGray};
  color: ${theme.colors.gold};
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledTip = styled.span`
  font-weight: 600;
  width: 100%;
`;

const Tip = ({ command, description }) => {
  return (
    <StyledTip>
      Use <Code>{command}</Code> - {description}
    </StyledTip>
  );
};

const SpoonmanLanding = () => {
  const tip = SERVER_COMMANDS[0];

  return (
    <InnerBox className="isOpen">
      <ContentContainer>
        <header>
          <Title>
            {/* {'Spoon'.split('').map((letter, index) => (
              <span className="letter" key={index}>
                {letter}
              </span>
            ))} */}
            <span className="letter" key="1">
              Words
            </span>
            man
          </Title>
        </header>
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
        <ContentBlock>
          <TipContainer>
            <Tip command={tip.command} description={tip.description} />
          </TipContainer>
        </ContentBlock>
      </ContentContainer>
    </InnerBox>
  );
};

export default SpoonmanLanding;
