import extraPages from 'extraPages';
import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { byCategoryPriority, pathCase } from 'utils';

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

const HorizontalLine = styled.hr`
  background-color: ${props => props.theme.side.defaultText};
  margin: 10px 0 10px 0;
`;

const SideContent = ({ activeMenu }) => {
  const isActive = value => value === activeMenu;

  return (
    <StaticQuery
      query={query}
      render={data => {
        const categories = data.allMarkdownRemark.nodes.map(
          node => node.fields.category
        );

        return (
          <StyledSideContent>
            {categories.sort(byCategoryPriority).map(category => (
              <CategoryLink
                active={isActive(category) ? 1 : 0}
                key={category}
                to={`/${pathCase(category)}`}
              >
                <i className="fas fa-hashtag fa-fw" />
                <span>{category}</span>
              </CategoryLink>
            ))}
            <HorizontalLine />
            {extraPages.map(page => (
              <CategoryLink
                active={isActive(page.name) ? 1 : 0}
                key={page.name}
                to={`/${pathCase(page.path)}`}
              >
                <i className="fas fa-hashtag fa-fw" />
                <span>{page.name}</span>
              </CategoryLink>
            ))}
          </StyledSideContent>
        );
      }}
    />
  );
};

const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [fields___category], order: ASC }) {
      nodes {
        fields {
          category
        }
      }
    }
  }
`;

export default SideContent;
