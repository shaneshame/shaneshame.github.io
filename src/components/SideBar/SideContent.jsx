import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const StyledSideContent = styled.nav`
  background-color: ${props => props.theme.side.defaultBack};
  -ms-overflow-style: none;
  overflow: auto;
  padding: 10px 0;

  ::-webkit-scrollbar {
    display: none;
  }

  ul {
    height: 100%;
    list-style: none;
    margin: 0;
  }

  ul li {
    margin: 0;
  }

  ul li div {
    margin-left: 50px;
    padding: 5px;
  }
`;

const CategoryLink = styled(Link)`
  background-color: ${props =>
    props.active && props.theme.side.category.activeBack};
  color: ${props =>
    props.active ? props.theme.side.category.activeText : 'inherit'};
  display: block;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background-color: ${props => props.theme.side.category.activeBack};
    color: ${props => props.theme.side.category.activeText} !important;
  }

  i {
    margin: 10px 20px 10px 30px;
    vertical-align: middle;
  }

  span {
    vertical-align: middle;
  }
`;

const SideContent = ({ activeMenu }) => (
  <StaticQuery
    query={query}
    render={data => {
      const categories = data.allMarkdownRemark.nodes.map(
        node => node.fields.category
      );

      return (
        <StyledSideContent>
          {categories.map(category => {
            const isActive = activeMenu === category;
            return (
              <CategoryLink
                active={isActive ? 1 : 0}
                key={category}
                to={`/${category}`}
              >
                <i className="fas fa-hashtag fa-fw" />
                <span>{category}</span>
              </CategoryLink>
            );
          })}
        </StyledSideContent>
      );
    }}
  />
);

const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        fields {
          category
        }
      }
    }
  }
`;

export default SideContent;
