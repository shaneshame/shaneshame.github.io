import React from 'react';
import styled from 'styled-components';

const windowHeight = '640px';
const windowWidth = '800px';

const colors = {
  darkBlue: '#6074ca',
  darkGray: '#2f3136',
  discordBlueLink: '#00b0f4',
  lightGray: '#36393f',
  white: '#ffffff',
};

const Container = styled.div`
  background-color: ${colors.lightGray};
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 16px;
  height: ${windowHeight};
  position: relative;
  width: ${windowWidth};

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
  color: ${colors.white};
  height: 50%;
  left: 50%;
  margin: 0 auto;
  padding: 1em;
  position: absolute;
  width: 50%;
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
  top: 45%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
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
  letter-spacing: 1px;
  margin-top: 1em;
  padding: 0.75em 1em;
  text-transform: uppercase;
`;

const MOTD = () => {
  return (
    <Container>
      <InnerBox>
        <ContentContainer>
          <Title>Spoonman</Title>
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
