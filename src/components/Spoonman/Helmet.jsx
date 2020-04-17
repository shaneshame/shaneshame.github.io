import React from 'react';
import { Helmet } from 'react-helmet';

import { DISCORD_INVITE_LINK, SERVER_IP } from './common';
import spoonman from './spoonman.png';

/* eslint-disable sort-keys */
/*
/* Order of appearance in Slack and Discord  (2020.04) */
/* 
/* TODO: Move to .env? */
const unfurlData = {
  name: 'SPOONMAN | TF2',
  title: '[Chicago] Payload+',
  description: `Server IP: ${SERVER_IP}\n<b>Discord</b>: ${DISCORD_INVITE_LINK}\n`,
  image: spoonman,
  url: 'https://shaneshame.github.io/spoonman',
};
/* eslint-enable sort-keys */

const Helm = () => {
  return (
    <Helmet>
      <meta content={unfurlData.url} property="og:url" />
      <meta content={unfurlData.title} property="og:title" />
      <meta content={unfurlData.description} property="og:description" />
      <meta content={unfurlData.name} property="og:site_name" />
      <meta content={unfurlData.image} property="og:image" />
    </Helmet>
  );
};

export default Helm;
