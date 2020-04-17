import styled from 'styled-components';

import theme from './theme';

const InnerBox = styled.div`
  background: ${theme.colors.darkGray};
  border-radius: 10px;
  box-shadow: 20px 20px 47px ${theme.colors.darkerGray},
    -20px -20px 47px #474a52;
  box-sizing: border-box;
  color: ${theme.colors.pink};
  height: ${theme.floatingBoxDimensions.height}px;
  padding: 1rem;
  position: relative;
  width: ${theme.floatingBoxDimensions.width}px;
  top: 45%;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  &.main {
    transition: transform 0.4s ease;
    transform: translate(50%, -50%);

    &.isSideOpen {
      transform: translate(0, -50%);
    }
  }

  &.secondary {
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.6s ease;
    transform: translate(50%, -50%);

    &.isSideOpen {
      transform: translate(0, -50%);
      opacity: 1;
    }
  }
`;

export default InnerBox;
