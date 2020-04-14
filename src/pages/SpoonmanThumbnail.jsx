import React from 'react';
import styled from 'styled-components';

const windowSize = {
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
  border-radius: 100%;
  box-shadow: 20px 20px 47px ${colors.darkerGray}, -20px -20px 47px #474a52;
  box-sizing: border-box;
  color: ${colors.green};
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
  border: 1px solid pink;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  line-height: 84px;
  padding: 1rem;
  place-content: center;
  text-align: center;
  width: 100%;
`;

const TitleThumbnail = styled.div`
  color: pink;
  display: flex;
  font-size: 84px;
  font-weight: 600;
  justify-content: space-around;
  text-transform: uppercase;

  &.reversed {
    filter: FlipH;
    transform: scaleX(-1);
  }
`;

const MOTD = () => {
  return (
    <Container>
      <InnerBox className="isOpen">
        <ContentContainer>
          <TitleThumbnail className="reversed part--spoon">
            {'Spoon'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </TitleThumbnail>
          <TitleThumbnail className="part--man">
            {'man'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </TitleThumbnail>
        </ContentContainer>
      </InnerBox>
    </Container>
  );
};

export default MOTD;
