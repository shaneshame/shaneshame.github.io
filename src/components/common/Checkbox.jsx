import React, { useRef } from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div``;

const CheckboxLabel = styled.span`
  cursor: pointer;
  margin-left: 5px;
`;

// eslint-disable-next-line no-unused-vars
const CheckboxInput = styled.input.attrs(props => ({
  type: 'checkbox',
}))`
  cursor: pointer;
`;

const Checkbox = ({ className, id, label, name, onChange, ...rest }) => {
  const inputRef = useRef();

  return (
    <CheckboxContainer className={className}>
      <CheckboxInput
        {...rest}
        id={id}
        onChange={event =>
          onChange({
            name,
            value: event.target.checked,
          })
        }
        ref={inputRef}
      />
      <CheckboxLabel htmlFor={id} onClick={() => inputRef.current.click()}>
        {label}
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;
