import React from 'react';
import styled from 'styled-components';

const sharedStyles = `
  display: inline-block;
  font-weight: bold;
  margin-left: 10px;
  padding: 3px 10px;
`;

const ButtonLinkBase = styled.a`
  ${sharedStyles}
  box-shadow: inset 0px 1px 0px 0px #9fb4f2;
  background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
  background-color: #7892c2;
  border: 1px solid #4e6096;
  cursor: pointer;
  color: #ffffff;
  text-decoration: none;
  text-shadow: 0px 1px 0px #283966;

  &:hover {
    background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
    background-color: #476e9e;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const DisabledLink = styled.div`
  ${sharedStyles}
  background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
  border: 1px solid #dedede;
  box-shadow: none;
  color: #adadad;
  cursor: default;
  text-shadow: none;
`;

const ButtonLink = ({ disabled, ...rest }) => {
  return disabled ? <DisabledLink {...rest} /> : <ButtonLinkBase {...rest} />;
};

export default ButtonLink;
