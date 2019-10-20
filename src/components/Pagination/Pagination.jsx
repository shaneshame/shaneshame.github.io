import { range } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import PageButtonDefault from './PageButton';

const PageButton = styled(PageButtonDefault)`
  visibility: ${props => (props.visible === false ? 'hidden' : 'visible')};
`;

const StyledPagination = styled.nav`
  margin: 1em auto;
  text-align: center;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0.5em;
  }
`;

const pagePath = (path, page) => {
  return page > 1 ? `${path}${page}` : path;
};

const Pagination = ({ listSize, pageContext, path }) => {
  const activePage = pageContext.humanPageNumber;
  const totalPage = pageContext.numberOfPages;

  const startPage = Math.max(
    1,
    Math.min(activePage, totalPage - (listSize - 1))
  );
  const endPage = Math.min(startPage + listSize - 1, totalPage);

  const pathToPrev = pageContext.previousPagePath || '/';
  const pathToNext =
    pageContext.nextPagePath || `/${pageContext.numberOfPages}`;

  return (
    <StyledPagination>
      <ul>
        <PageButton link={pathToPrev} visible={activePage !== 1}>
          <i className="fas fa-chevron-left" />
        </PageButton>
        {range(startPage, endPage + 1).map(pageNumber => (
          <PageButton
            active={pageNumber === activePage}
            key={pageNumber}
            link={pagePath(path, pageNumber)}
          >
            {pageNumber}
          </PageButton>
        ))}
        <PageButton link={pathToNext} visible={activePage !== totalPage}>
          <i className="fas fa-chevron-right" />
        </PageButton>
      </ul>
    </StyledPagination>
  );
};

export default Pagination;
