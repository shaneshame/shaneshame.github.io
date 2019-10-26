import styled from 'styled-components';
import { styles } from 'utils';

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

  &:hover {
    background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
    background-color: #476e9e;
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:disabled {
    background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
    color: black;
  }
`;

Button.defaultProps = {
  disabled: false,
};

export default Button;
