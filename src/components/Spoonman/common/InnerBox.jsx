import styled from 'styled-components';

import theme from './theme';

const InnerBox = styled.div`
  background: ${theme.colors.darkGray};
  border-radius: 10px;
  box-shadow: 20px 20px 47px ${theme.colors.darkerGray},
    -20px -20px 47px #474a52;
  box-sizing: border-box;
  color: ${theme.colors.pink};
  height: ${theme.windowSize.height}px;
  opacity: 0;
  padding: 1em;
  position: relative;
  width: ${theme.windowSize.width}px;
  top: 45%;
  transition: opacity 0.2s ease;
  transform: translateY(-50%);

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  &.isOpen {
    opacity: 1;
  }
`;

export default InnerBox;
