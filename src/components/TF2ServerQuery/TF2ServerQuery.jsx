import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Header, Input, Label, Row } from '../common';

const IP_EXAMPLE = '74.91.123.146:27015';

const Form = styled.form``;

const TF2ServerQuery = () => {
  const [serverIP, setServerIP] = useState('');

  const handleChangeServerIP = e => {
    const newServerIP = e.target.value;
    setServerIP(newServerIP);
  };

  const handleSubmit = () => {
    console.log('Form submitted', 'IP:', serverIP);
  };

  return (
    <div>
      <Header>TF2 Server Query</Header>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Label
            css={`
              display: inline-block;
              margin-right: 10px;
            `}
            htmlFor="server-ip"
          >
            Server IP:
          </Label>
          <Input
            id="server-ip"
            onChange={handleChangeServerIP}
            placeholder={IP_EXAMPLE}
            type="text"
            value={serverIP}
          />
          <Button role="submit">Search</Button>
        </Form>
      </Row>
    </div>
  );
};

export default TF2ServerQuery;
