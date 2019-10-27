import styled from 'styled-components';

const Button = styled.button`
  box-shadow: inset 0px 1px 0px 0px #9fb4f2;
  background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
  background-color: #7892c2;
  border: 1px solid #4e6096;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-weight: bold;
  padding: 3px 10px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #283966;

  &:hover:not([disabled]) {
    background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
    background-color: #476e9e;
  }

  &:active:not([disabled]) {
    position: relative;
    top: 1px;
  }

  &:disabled {
    background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
    border: 1px solid #dedede;
    box-shadow: none;
    color: #adadad;
    cursor: initial;
    text-shadow: none;
  }

  &.error {
    background: linear-gradient(to bottom, #fe1a00 5%, #ce0100 100%);
    background-color: #fe1a00;
    border: 1px solid #d83526;
    box-shadow: inset 0px 1px 0px 0px #f29c93;
    color: #ffffff;
    text-shadow: 0px 1px 0px #b23e35;

    &:hover {
      background: linear-gradient(to bottom, #ce0000 5%, #b23d35 100%);
      background-color: #ce0000;
    }
  }

  &.success {
    background: linear-gradient(to bottom, #44c767 5%, #5cbf2a 100%);
    background-color: #44c767;
    border: 1px solid #18ab29;
    box-shadow: inset 0px 1px 0px 0px #3dc21b;
    color: #ffffff;
    text-shadow: 0px 1px 0px #2f6627;

    &:hover {
      background: linear-gradient(to bottom, #18ab29 5%, #2f6627 100%);
      background-color: #18ab29;
    }
  }
`;

export default Button;
