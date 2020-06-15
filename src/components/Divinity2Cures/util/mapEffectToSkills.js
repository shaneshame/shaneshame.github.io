const identity = v => v;

const uniqueBy = (arr, selector = identity) => {
  return Object.values(
    arr.reduce((acc, element) => {
      acc[selector(element)] = element;
      return acc;
    }, {})
  );
};

const mapEffectToSkills = (statusEffect = {}, skills = []) => {
  const statusRemoves = statusEffect.removes || [];

  return skills
    .filter(skill => {
      const skillStatusEffects = skill.statusEffects || [];
      return skillStatusEffects
        .map(({ name = "" }) => name.toLowerCase())
        .includes(statusEffect.name.toLowerCase());
    })
    .map(({ removes = [], ...rest }) => ({
      ...rest,
      removes: uniqueBy([...statusRemoves, ...removes], identity)
    }));
};

export default mapEffectToSkills;
