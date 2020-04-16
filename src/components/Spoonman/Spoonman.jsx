import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { DISCORD_INVITE_LINK, SERVER_IP, theme } from './common';
import screenshot from './spoonman.png';
import SpoonmanLanding from './SpoonmanLanding';

/* eslint-disable sort-keys */
const unfurlData = {
  name: 'SPOONMAN | TF2',
  title: '[Chicago] Payload+',
  description: `Server IP: ${SERVER_IP}\nDiscord: ${DISCORD_INVITE_LINK}\n`,
  screenshot,
  url: 'https://shaneshame.github.io/Spoonman',
};
/* eslint-enable sort-keys */

const Container = styled.div`
  background-color: ${theme.colors.lightGray};
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
      <SpoonmanLanding />
    </Container>
  );
};

export default Spoonman;
