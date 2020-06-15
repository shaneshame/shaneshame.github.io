import styled from 'styled-components';
import { media } from 'utils';

const StyledMainContent = styled.section`
  ${props => props.isArticle && 'max-width: calc(825px - 110px);'}

  overflow: auto;
  padding: 20px;

  ${media.tablet} {
    ${props => props.isArticle && 'max-width: calc(825px - 50px);'}

    padding: 20px 50px;
  }

  ${media.desktop} {
    ${props => props.isArticle && 'max-width: 825px;'}

    padding: 50px 75px;
  }

  &.isApp {
    height: 100vh;
    margin: 0;
    padding: 0;

    & > * {
      box-sizing: border-box;
    }
  }
`;

export default StyledMainContent;
