import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { SearchResults } from './components';
import SKILLS from './data/skills.json';
import STATUS_EFFECTS from './data/statusEffects.json';
import { searchCures } from './util';
import './styles.css';

const Container = styled.div`
  background-color: var(--backgroundPurple);
  height: 100%;
  padding: 0.5em;
`;

const AppArea = styled.div`
  background-color: var(--backgroundPurple);
  border-radius: 25px;
  box-sizing: border-box;
  background: linear-gradient(225deg, #730073, #890089);
  box-shadow: -41px 41px 100px #330033, 41px -41px 100px #330033;
  height: 100%;
  margin: 0 auto;
  max-width: 768px;
  overflow: hidden;
`;

const AppContent = styled.div`
  box-sizing: border-box;
  height: 100%;
  margin: 0 auto;
  padding: 1em 0;
  width: 75%;

  & > * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Heading = styled.h1`
  color: var(--textColor);
  margin: 0;
  padding-top: 0.5em;
  text-align: center;
`;

const SubHeading = styled.h2`
  box-sizing: border-box;
  color: var(--subHeadingColor);
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 0.25em 0;
  padding-top: 0.5em;
`;

const SearchInput = styled.input`
  border-radius: 3px;
  padding: 0.75em;
  border: none;
  font-size: 1em;
  font-weight: normal;
  width: 100%;
`;

const Divinity2Cures = () => {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [cureResults, setCureResults] = useState([]);
  const inputRef = useRef();

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setData({
      skills: SKILLS,
      statusEffects: STATUS_EFFECTS,
    });

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(
    debounce(() => {
      const cureResults =
        searchValue.length > 0
          ? searchCures(searchValue.toLowerCase(), data)
          : [];
      setCureResults(cureResults);
    }, 300),
    [data, searchValue]
  );

  return (
    <Container>
      <AppArea>
        <AppContent>
          <Heading>Divinity Original Sin 2</Heading>
          <SubHeading htmlFor="searchInput">Find cures for...</SubHeading>
          <SearchInput
            id="searchInput"
            onChange={handleSearchChange}
            placeholder={`"Burning", "Decaying", etc.`}
            ref={inputRef}
            value={searchValue}
          />
          {cureResults.length > 0 && (
            <SearchResults results={cureResults} searchValue={searchValue} />
          )}
        </AppContent>
      </AppArea>
    </Container>
  );
};

export default Divinity2Cures;
