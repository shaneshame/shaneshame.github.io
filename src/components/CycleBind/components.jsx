import styled from 'styled-components';
import { media } from 'utils';

import { TextArea } from '../common';

const P = styled.p``;

const Container = styled.div`
  position: relative;
`;

const Header = styled.h1`
  margin: 0 0 15px 0;
`;

const SectionHeader = styled.h3`
  /* border-bottom: 1px solid hsla(0, 0%, 0%, 0.07); */
  padding-bottom: 4.5px;
`;

const CodeArea = styled(TextArea)`
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  font-size: ${props => props.fontSize || 9}px;
  width: 100%;
`;

const SectionsContainer = styled.div`
  ${media.tablet} {
    display: flex;
  }
`;

const Section = styled.section`
  ${media.tablet} {
    &:not(:first-of-type) {
      margin-left: 20px;
    }
  }
`;

const RulesList = styled.ul`
  margin-bottom: 0;
`;

const RulesItem = styled.li`
  margin: 0;
`;

const Row = styled.div`
  margin-top: 20px;
`;

export {
  CodeArea,
  Container,
  Header,
  P,
  Row,
  RulesItem,
  RulesList,
  Section,
  SectionHeader,
  SectionsContainer,
};
