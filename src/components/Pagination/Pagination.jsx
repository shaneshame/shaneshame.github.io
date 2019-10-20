import React from 'react';
import styled from 'styled-components';

import PageButton from './PageButton';

const StyledPagination = styled.nav`
  margin: 1em auto;
  text-align: center;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0.5em;
  }
`;

const Pagination = ({ listSize, pageContext, path }) => {
  const totalPage = pageContext.numberOfPages;
  const activePage = pageContext.humanPageNumber;

  const startPage = parseInt((activePage - 1) / listSize) * listSize + 1;
  const endPage =
    startPage + listSize - 1 < totalPage ? startPage + listSize - 1 : totalPage;

  const totalList = Math.ceil(totalPage / listSize);
  const currentList = parseInt((activePage - 1) / listSize) + 1;

  const prevList = currentList <= 1 ? null : (currentList - 1) * listSize;
  const nextList = currentList < totalList ? currentList * listSize + 1 : null;

  let pgs = [];

  for (let i = startPage; i <= endPage; i++) {
    let pageNum = i !== 1 ? `${i}` : '';

    pgs.push(
      <PageButton active={i === activePage} key={i} link={`${path}${pageNum}`}>
        {i}
      </PageButton>
    );
  }

  const prevListPath = prevList && prevList > 1 ? `/${prevList}` : '';

  return (
    <StyledPagination>
      <ul>
        {prevList && (
          <PageButton link={`${path}${prevListPath}`}>
            <i className="fas fa-chevron-left" />
          </PageButton>
        )}
        {pgs.length > 0 && pgs}
        {nextList && (
          <PageButton link={`${path}${nextList}`}>
            <i className="fas fa-chevron-right" />
          </PageButton>
        )}
      </ul>
    </StyledPagination>
  );
};

export default Pagination;
