import React from 'react';
import styled from 'styled-components';

import { media } from '../../../utils';
import SearchResult from './SearchResult';

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  max-height: 85%;
  margin: 1em 0 4em;
  padding: 0.5em 0 4em;
  width: 100%;
`;

const List = styled.ul`
  border: 1px solid var(--borderColor);
  border-radius: 3px;
  box-sizing: border-box;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  overflow-y: auto;
  text-align: left;
  width: 100%;

  ${media.tablet} {
    overflow-x: hidden;
  }
`;

const ListItem = styled.li`
  margin: 0;
`;

const Divider = styled.div`
  border-bottom: 1px solid black;
  margin: 0 auto;
  opacity: 1;
  transition: opacity 0.1s;
  width: 95%;
`;

const SearchResults = ({ results, searchValue }) => {
  return (
    <Container>
      <List>
        {results.map((result, index) => (
          <ListItem key={result.name}>
            <SearchResult {...result} searchValue={searchValue} />
            {index < results.length - 1 && <Divider />}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SearchResults;
