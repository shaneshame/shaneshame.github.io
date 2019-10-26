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
  margin-left: 10px;
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
`;

export default Button;
