import styled from 'styled-components';

import theme from './theme';

const Code = styled.code`
  background-color: ${theme.colors.darkerGray};
  border-radius: 5px;
  color: ${theme.colors.red};
  font-family: monospace, monospace;
  font-weight: 600;
  padding: 0.35rem;
`;

export default Code;
