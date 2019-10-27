import React from 'react';
import styled from 'styled-components';
import { stringBoolean } from 'utils';

const RadioGroupBase = styled.div`
  .radio-item {
    &:not(:first-of-type) {
      margin-left: 15px;
    }
  }
`;

// eslint-disable-next-line no-unused-vars
const RadioInput = styled.input.attrs(props => ({
  type: 'radio',
}))``;

const RadioLabel = styled.label`
  margin-left: 5px;
`;

const RadioContainer = styled.div`
  display: inline;
`;

const RadioGroup = ({ children, onChange }) => {
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { onChange })
  );

  return <RadioGroupBase>{childrenWithProps}</RadioGroupBase>;
};

const RadioItem = ({ children, id, onChange, ...rest }) => {
  return (
    <RadioContainer className="radio-item">
      <RadioInput
        {...rest}
        id={id}
        onChange={event => onChange(stringBoolean(event.currentTarget.value))}
      />
      <RadioLabel htmlFor={id}>{children}</RadioLabel>
    </RadioContainer>
  );
};

export { RadioGroup, RadioItem };
