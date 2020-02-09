import Gamedig from 'gamedig';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { media } from 'utils';

import { Label as BaseLabel, Button, Header, Input, Row } from '../common';

const IP_EXAMPLE = '74.91.123.146';
const PORT_DEFAULT = 27015;

const Label = styled(BaseLabel)`
  display: block;
  margin-right: 10px;

  ${media.tablet} {
    display: inline-block;
  }
`;

const Form = styled.form``;

const TF2ServerQuery = () => {
  const [serverIP, setServerIP] = useState('');
  const [port, setPort] = useState(PORT_DEFAULT);

  const handleChangeServerIP = e => {
    const newServerIP = e.target.value;
    setServerIP(newServerIP);
  };

  const handleChangePort = e => {
    const port = e.target.value;
    setPort(port);
  };

  const handleSubmit = event => {
    console.log('Form submitted', 'IP:', serverIP);
    event.preventDefault();
  };

  useEffect(() => {
    Gamedig.query({
      host: '74.91.123.146',
      type: 'tf2',
    })
      .then(state => {
        console.log(state);
      })
      .catch(error => {
        console.log('Server is offline');
      });
  });

  return (
    <div>
      <Header>TF2 Server Query</Header>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="server-ip">TF2 Server IP:</Label>
          <Input
            id="server-ip"
            onChange={handleChangeServerIP}
            placeholder={IP_EXAMPLE}
            type="text"
            value={serverIP}
          />
          <Label htmlFor="port">Port:</Label>
          <Input
            id="port"
            onChange={handleChangePort}
            type="text"
            value={port}
          />
          <Button
            css={`
              margin-left: 5px;
              padding: 1px 10px;
            `}
            role="submit"
          >
            Search
          </Button>
        </Form>
      </Row>
    </div>
  );
};

export default TF2ServerQuery;
