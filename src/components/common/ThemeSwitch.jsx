import React from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;

  i {
    font-size: 20px;
    vertical-align: middle;
    padding: 5px;
    padding-left: 8px;

    &.fa-moon {
      color: #212121;
    }
    &.fa-sun {
      color: #3f0f3f;
    }
  }
`;

const ThemeSwitch = ({ onChange, checked }) => {
  return (
    <Container>
      <Switch
        checked={checked}
        checkedIcon={<i className="fas fa-moon" />}
        handleDiameter={24}
        height={30}
        offColor={'#fff'}
        offHandleColor={'#3f0f3f'}
        onChange={onChange}
        onColor={'#999999'}
        onHandleColor={'#212121'}
        uncheckedIcon={<i className="fas fa-sun" />}
        width={60}
      />
    </Container>
  );
};

export default ThemeSwitch;
