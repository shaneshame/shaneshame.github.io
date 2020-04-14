import React from 'react';
import styled from 'styled-components';

const colors = {
  darkBlue: '#7289DA',
  darkBlueHover: '#677BC4',
  darkGray: '#2F3136',
  discordBlueLink: '#00B0F4',
  green: '#008000',
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
  box-shadow: 20px 20px 47px #17181a, -20px -20px 47px #474a52;
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
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  margin: 0 0 0.5em 0;
  text-transform: uppercase;

  span {
    display: inline-block;
    transition: transform 0.2s ease;
  }

  &:hover {
    span {
      filter: FlipH;
      transform: scaleX(-1);
    }
  }
`;

const CeneteredRow = styled.div`
  display: block;
  height: auto;
  margin: 0 auto;
`;

const Link = styled.a`
  color: ${colors.discordBlueLink};
  display: inline-block;
  margin: 1em 0;
  text-transform: uppercase;
`;

const LinkButton = styled.a`
  background-color: ${colors.darkBlue};
  border-radius: 3px;

  color: ${colors.white};
  display: inline-block;
  font-family: Impact, Charcoal, sans-serif;
  font-size: 23px;
  letter-spacing: 1.5px;
  margin-top: 1em;
  padding: 0.75em 1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.1s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${colors.darkBlueHover};
    box-shadow: 0 12px 12px -6px #17181a, 0 0 6px #474a52;
    text-decoration: none;
  }
`;

const MOTD = () => {
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
          <CeneteredRow>
            <Link href="https://paste.ubuntu.com/p/PN94TXyhbw/">
              Don't be an asshole
            </Link>
          </CeneteredRow>
          <CeneteredRow>
            <LinkButton href="https://discord.gg/KH866DB">
              Join Discord
            </LinkButton>
          </CeneteredRow>
        </ContentContainer>
      </InnerBox>
    </Container>
  );
};

export default MOTD;
