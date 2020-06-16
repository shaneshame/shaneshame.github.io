import { keyBy, lowerCase } from 'lodash';

import mapEffectToSkills from './mapEffectToSkills';
import startsWith from './startsWith';

const searchCures = (_ailment, { skills = [], statusEffects = [] }) => {
  const ailment = lowerCase(_ailment);

  const skillCures = skills.filter(
    ({ immunities = [], removes = [] }) =>
      immunities.some(value => startsWith(value, ailment)) ||
      removes.some(value => startsWith(value, ailment))
  );

  const effectCures = statusEffects.filter(
    ({ immunities = [], removes = [] }) =>
      immunities.some(value => startsWith(value, ailment)) ||
      removes.some(value => startsWith(value, ailment))
  );

  const skillCuresFromEffects = effectCures
    .map(effect => mapEffectToSkills(effect, skills))
    .flat();

  const results = Object.values({
    ...keyBy(skillCures, sk => sk.name.toLowerCase()),
    ...keyBy(skillCuresFromEffects, sk => sk.name.toLowerCase()),
  }).sort((skillA, skillB) => {
    return skillA.actionPoints - skillB.actionPoints;
  });

  return results;
};

export default searchCures;
