import styled from 'styled-components';

const BioPopup = styled.div`
  position: absolute;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
  }
`;

export default BioPopup;
