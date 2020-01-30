import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from 'utils';

import { Label as BaseLabel, Button, Header, Input, Row } from '../common';

const IP_EXAMPLE = '74.91.123.146:27015';

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

  const handleChangeServerIP = e => {
    const newServerIP = e.target.value;
    setServerIP(newServerIP);
  };

  const handleSubmit = event => {
    console.log('Form submitted', 'IP:', serverIP);
    event.preventDefault();
  };

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
