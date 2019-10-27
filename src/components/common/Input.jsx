import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'utils';

const InputContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const InputBase = styled.input`
  margin: 0;

  &.error {
    border-color: ${theme.color.error};
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  bottom: -15px;
  color: ${theme.color.error};
  font-size: 10px;
  left: 0;
  position: absolute;
`;

const Input = ({ className, css, error, errorCss, inputCss, ...rest }) => {
  return (
    <InputContainer className={className}>
      <InputBase {...rest} className={clsx({ error })} css={inputCss} />
      {error && <ErrorMessage css={errorCss}>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
