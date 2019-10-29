import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'utils';

const SelectContainer = styled.div`
  display: inline-block;
`;

const SelectLabel = styled.label`
  margin-right: 8px;

  &.error {
    color: ${theme.color.error};
  }
`;

const SelectBase = styled.select`
  border-radius: 2px;
  padding: 2px 3px;

  &.error {
    border-color: ${theme.color.error};
    outline: none;
  }
`;

const SelectOption = styled.option``;

const Select = ({
  children,
  className,
  error,
  id,
  label,
  name,
  onChange,
  value,
}) => {
  return (
    <SelectContainer className={className}>
      {label && (
        <SelectLabel className={clsx({ error })} htmlFor={id}>
          {label}
        </SelectLabel>
      )}
      <SelectBase
        className={clsx({ error })}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      >
        {children}
      </SelectBase>
    </SelectContainer>
  );
};

export { Select, SelectOption };
