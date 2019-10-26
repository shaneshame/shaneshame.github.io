import { css } from 'styled-components';

const disabled = (...args) => {
  return props => {
    return props.disabled !== false && css(...args);
  };
};

export default {
  disabled,
};
