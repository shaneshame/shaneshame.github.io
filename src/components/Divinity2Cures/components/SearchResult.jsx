import clsx from 'clsx';
import { lowerCase, startsWith } from 'lodash';
import React from 'react';
import styled from 'styled-components';

const Result = styled.div`
  --searchResultPaddingX: 1em;
  --searchResultPaddingY: 0.75em;
  --searchResultTransitionTiming: 0.1s;

  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: var(--searchResultPaddingY) var(--searchResultPaddingX);
  position: relative;
  transition: box-shadow var(--searchResultTransitionTiming),
    margin var(--searchResultTransitionTiming),
    padding var(--searchResultTransitionTiming);
  width: 100%;

  &::first-child {
    margin-top: 0;
  }

  &::last-child {
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: 10px 10px 40px 6px rgba(0, 0, 0, 0.5);
    margin: 0 0.1em;
    --searchResultPaddingX--Hover: 1.1em;
    padding: var(--searchResultPaddingY) var(--searchResultPaddingX--Hover);

    & + div[class*='Divider'] {
      opacity: 0;
    }
  }
`;

const SkillNameContainer = styled.div`
  align-items: center;
  display: flex;
`;

const SkillImage = styled.img`
  margin: 0 1em 0 0;
`;

const SkillName = styled.h3`
  color: var(--skillColor);
  margin: 0 1em 0 0;
  max-width: 125px;
  min-width: 125px;
  text-transform: uppercase;
`;

const SkillDescription = styled.div`
  color: var(--textColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListTitle = styled.label`
  margin: 0;
  padding: 0;
`;

const ListAfflictionCures = styled.ul`
  list-style-type: disc;
  margin-top: 0;
`;

const AfflictionItem = styled.li`
  margin: 0;
  text-transform: capitalize;

  &.isResult {
    color: var(--skillColor);
  }
`;

const SearchResult = ({
  imageSrc = '',
  immunities = [],
  name,
  removes = [],
  searchValue: _searchValue = '',
}) => {
  const searchValue = lowerCase(_searchValue);
  const cures = Array.from(
    new Set([...removes, ...immunities].map(lowerCase))
  ).sort((valueA, valueB) => {
    return valueA.localeCompare(valueB);
  });

  return (
    <Result>
      <SkillNameContainer>
        <SkillImage alt={`Thumbnail for ${name}`} src={imageSrc} />
        <SkillName>{name}</SkillName>
      </SkillNameContainer>
      <SkillDescription>
        <ListTitle htmlFor="curesList">Removes:</ListTitle>
        <ListAfflictionCures id="curesList">
          {cures.map(cure => (
            <AfflictionItem
              className={clsx({
                isResult: startsWith(cure, searchValue),
              })}
              id={cure}
              key={cure}
            >
              {cure}
            </AfflictionItem>
          ))}
        </ListAfflictionCures>
      </SkillDescription>
    </Result>
  );
};

export default SearchResult;
