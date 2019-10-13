import { graphql, Link, StaticQuery } from 'gatsby';
import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import { Circle } from '../common';
import Bio from './Bio';
import BioPopup from './BioPopup';

const Container = styled.header`
  background-color: ${props => props.theme.side.defaultBack};
  font-size: 15px;
  padding: 20px;
`;

const BioContainer = styled.div`
  position: relative;

  & > div {
    background-color: ${props => props.theme.bio.defaultBack};
    border-radius: 6px;
    color: ${props => props.theme.bio.defaultText};
    padding: 8px;
    top: 125%;
    width: 240px;

    &:after {
      bottom: 99%;
      border-width: 7px;
      border-style: solid;
      border-color: transparent transparent
        ${props => props.theme.bio.defaultBack} transparent;
      left: 25%;
      margin-left: -5px;
    }
  }
`;

const Author = styled.span`
  color: ${props =>
    props.changeColor
      ? props.theme.side.bio.activeText
      : props.theme.side.bio.defaultText};

  #circle {
    background-color: ${props => props.theme.side.bio.circle};
  }

  i {
    padding-left: 5px;
    vertical-align: middle;
  }

  span {
    vertical-align: middle;
  }

  &:hover {
    color: ${props => props.theme.side.bio.activeText};
    cursor: pointer;
  }
`;

const BlogTitle = styled(Link)`
  color: inherit;
  display: block;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0;
  margin-left: 10px;
`;

class HandleClickOutside extends React.Component {
  // eslint-disable-next-line no-unused-vars
  handleClickOutside = event => {
    const { isOpen, onClose } = this.props;

    if (isOpen) {
      onClose();
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

const ClickOutsideHandler = onClickOutside(HandleClickOutside);

const SideHeader = () => {
  const [isBioOpen, setBioOpen] = useState(false);

  const handleToggleBio = () => {
    setBioOpen(!isBioOpen);
  };

  const handleCloseBio = () => {
    setBioOpen(false);
  };

  return (
    <StaticQuery
      query={query}
      render={data => {
        const node = data.site.siteMetadata;
        return (
          <Container>
            <BlogTitle to={'/'}>{node.title}</BlogTitle>
            <BioContainer>
              <ClickOutsideHandler isOpen={isBioOpen} onClose={handleCloseBio}>
                <Author changeColor={isBioOpen} onClick={handleToggleBio}>
                  <Circle size={'13'} />
                  <span>{node.authorNickName}</span>
                  <i className="fas fa-chevron-down" />
                </Author>
                {isBioOpen && (
                  <BioPopup>
                    <Bio />
                  </BioPopup>
                )}
              </ClickOutsideHandler>
            </BioContainer>
          </Container>
        );
      }}
    />
  );
};

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        authorNickName
      }
    }
  }
`;

export default SideHeader;
