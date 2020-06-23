import clsx from 'clsx';
import { lowerCase, times } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { startsWith } from '../util';
import AP from './AP';
import SP from './SP';

const Result = styled.div`
  --searchResultPaddingX: 1em;
  --searchResultPaddingY: 0.75em;
  --searchResultTransitionTiming: 0.1s;

  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  line-height: 1.3;
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
  /* align-items: center; */
  display: flex;
`;

const SkillImage = styled.img`
  display: block;
  margin: 0;
  min-width: 64px;
`;

const SkillName = styled.h3`
  color: var(--skillColor);
  margin: 0 0 0.25em 0;
  max-width: 160px;
  min-width: 160px;
  text-transform: uppercase;
`;

const AfflictionContainer = styled.div`
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

const Column = styled.div`
  width: 60%;
`;

const Description = styled.p`
  color: var(--descriptionColor);
  margin: 0;
  padding: 0;
`;

const Cost = styled.div`
  align-items: flex-start;
  display: flex;
  margin: 0.2rem 0 0 0;
  justify-content: center;
`;

const SkillImageContainer = styled.div``;

const NameContainer = styled.div`
  margin: 0 0 0 1rem;
`;

const SearchResult = ({
  actionPoints,
  description,
  imageSrc = '',
  immunities = [],
  name,
  removes = [],
  searchValue: _searchValue = '',
  sourcePoints,
}) => {
  const searchValue = lowerCase(_searchValue);
  const cures = Array.from(
    new Set([...removes, ...immunities].map(lowerCase))
  ).sort((valueA, valueB) => {
    return valueA.localeCompare(valueB);
  });

  return (
    <Result>
      <Column>
        <SkillNameContainer>
          <SkillImageContainer>
            <SkillImage alt={`Thumbnail for ${name}`} src={imageSrc} />
            <Cost>
              {times(actionPoints, () => (
                <AP />
              ))}
              {times(sourcePoints, () => (
                <SP />
              ))}
            </Cost>
          </SkillImageContainer>
          <NameContainer>
            <SkillName>{name}</SkillName>
            <Description>{description}</Description>
          </NameContainer>
        </SkillNameContainer>
      </Column>
      <AfflictionContainer>
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
      </AfflictionContainer>
    </Result>
  );
};

export default SearchResult;
