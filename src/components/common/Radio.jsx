import React from 'react';
import styled from 'styled-components';
import { stringBoolean } from 'utils';

const RadioGroupContainer = styled.div`
  display: inline-block;

  .radio-item {
    &:not(:first-of-type) {
      margin-left: 20px;
    }
  }
`;

const RadioTitle = styled.span`
  display: inline-block;
  font-weight: 500;
  text-align: center;
  width: 100%;
`;

const RadioItemContainer = styled.div`
  border-top: 1px solid black;
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

const RadioGroup = ({ children, className, onChange, title }) => {
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { onChange })
  );

  return (
    <RadioGroupContainer className={className}>
      {title && <RadioTitle>{title}</RadioTitle>}
      <RadioItemContainer>{childrenWithProps}</RadioItemContainer>
    </RadioGroupContainer>
  );
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
