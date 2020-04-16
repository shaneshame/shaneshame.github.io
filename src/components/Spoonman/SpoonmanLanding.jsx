import React from 'react';
import styled from 'styled-components';

import {
  ContentContainer,
  DISCORD_INVITE_LINK,
  InnerBox,
  SERVER_IP,
  theme,
} from './common';

const Title = styled.h1`
  border: 1px solid ${theme.colors.pink};
  color: ${theme.colors.pink};
  margin: 0;
  padding: 0.5em 0 calc(0.5em + 2px) 0;
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
  background-color: ${theme.colors.darkerGray};
  border: none;
  border-radius: 3px;
  color: inherit;
  font-family: monospace, monospace;
  font-size: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.625rem;
  margin: 0;
  padding: 0.35rem;
  text-align: center;
  text-transform: none;
  width: 16rem;
`;

const InfoLabel = styled.b`
  color: ${theme.colors.offWhite};
  display: block;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const ContentBlock = styled.div`
  margin: 0.75rem 0;
`;

const RulesBlock = styled.div`
  color: ${theme.colors.aquaGreen};
  margin: 0.8rem 0 0.75rem;
  padding: 0.75rem 0;
  text-transform: uppercase;
`;

const RulesLabel = styled(InfoLabel)`
  color: inherit;
  margin-bottom: 0.05rem;
`;

const RulesList = styled.ul`
  margin-bottom: 0;
  padding-left: 1rem;
  text-align: left;
`;

const Rule = styled.li`
  margin: 0;
`;

const Label = styled.label`
  display: block;
  font-family: Tahoma, Geneva, sans-serif;
  text-transform: uppercase;
`;

const SpoonmanLanding = () => {
  return (
    <InnerBox className="isOpen">
      <ContentContainer>
        <Title>
          {'Spoon'.split('').map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
          man
        </Title>
        <RulesBlock>
          <RulesLabel>Rules</RulesLabel>
          <RulesList>
            <Rule>Don't be an asshole</Rule>
          </RulesList>
        </RulesBlock>
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
        </ContentBlock>
        <ContentBlock>
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
      </ContentContainer>
    </InnerBox>
  );
};

export default SpoonmanLanding;
