import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'utils';

const TextAreaBase = styled.textarea`
  display: block;
  overflow: auto;
  padding: 5px;

  &.error {
    border-color: ${theme.color.error};
    outline: none;
  }
`;

const TextArea = ({ className, error, ...rest }) => {
  return <TextAreaBase {...rest} className={clsx(className, { error })} />;
};

export default TextArea;
