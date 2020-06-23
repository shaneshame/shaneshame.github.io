import clsx from 'clsx';
import { chunk, lowerCase, times } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { useMediaQuery } from '../../../hooks';
import { media } from '../../../utils';
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
  flex-direction: column;
  line-height: 1.3;
  height: 100%;
  margin: 0;
  overflow: auto;
  padding: var(--searchResultPaddingY) var(--searchResultPaddingX);
  position: relative;
  transition: box-shadow var(--searchResultTransitionTiming),
    margin var(--searchResultTransitionTiming),
    padding var(--searchResultTransitionTiming);
  width: 100%;

  ${media.tablet} {
    flex-direction: row;
    overflow: hidden;
  }

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
  margin: 0 auto;
  min-width: 64px;
`;

const SkillName = styled.h3`
  color: var(--skillColor);
  margin: 0 0 0.25em 0;
  max-width: 160px;
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

const Description = styled.p`
  color: var(--descriptionColor);
  margin: 0;
  padding: 0;
  width: 14em;
`;

const Cost = styled.div`
  align-items: flex-start;
  display: flex;
  margin: 0.2rem 0 0 0;
  max-width: 64px;
  justify-content: center;
`;

const SkillImageContainer = styled.div``;

const ColumnTwo = styled.div`
  margin: 0 0.1em 0 1em;
  width: 8em;

  ${media.tablet} {
    width: auto;
  }
`;

const Costs = ({ ap = 0, sp = 0 }) => {
  const pointsPerRow = 4;

  const apGroup = times(ap, () => <AP />);
  const spGroup = times(sp, () => <SP />);
  const points = [...apGroup, ...spGroup];

  return (
    <React.Fragment>
      {chunk(points, pointsPerRow).map(row => (
        <Cost>{row}</Cost>
      ))}
    </React.Fragment>
  );
};

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
  const mq = useMediaQuery();
  const searchValue = lowerCase(_searchValue);
  const cures = Array.from(
    new Set([...removes, ...immunities].map(lowerCase))
  ).sort((valueA, valueB) => {
    return valueA.localeCompare(valueB);
  });

  return (
    <Result>
      {mq.atLeast('tablet') ? (
        <>
          <SkillNameContainer>
            <SkillImageContainer>
              <SkillImage alt={`Thumbnail for ${name}`} src={imageSrc} />
              <Costs ap={actionPoints} sp={sourcePoints} />
            </SkillImageContainer>
            <ColumnTwo>
              <SkillName>{name}</SkillName>
              <Description>{description}</Description>
            </ColumnTwo>
          </SkillNameContainer>
          <AfflictionContainer>
            <ListTitle htmlFor="curesList">Cures:</ListTitle>
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
        </>
      ) : (
        <>
          <SkillNameContainer>
            <SkillImageContainer>
              <SkillImage alt={`Thumbnail for ${name}`} src={imageSrc} />
              <Costs ap={actionPoints} sp={sourcePoints} />
            </SkillImageContainer>
            <ColumnTwo>
              <SkillName>{name}</SkillName>
              <AfflictionContainer>
                <ListTitle htmlFor="curesList">Cures:</ListTitle>
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
            </ColumnTwo>
            <Description>{description}</Description>
          </SkillNameContainer>
        </>
      )}
    </Result>
  );
};

export default SearchResult;
