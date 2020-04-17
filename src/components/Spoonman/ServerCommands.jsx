import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

import { Code, InnerBox, SERVER_COMMANDS, theme } from './common';

const TableContainer = styled.div`
  font-size: 1em;
  margin: 0 auto;
  width: 95%;
`;

const Table = styled.table`
  font-size: inherit;
`;

const TBody = styled.tbody``;

const stylesThTd = `
  border-bottom-color: ${theme.colors.goldPale};
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.4em;
  padding-bottom: calc(0.4em - 1px);
`;

const TH = styled.th`
  ${stylesThTd}
`;

const TD = styled.td`
  ${stylesThTd}
`;

const THead = styled.thead``;

const HeaderRow = styled.tr``;

const TR = styled.tr`
  &:hover {
    background-color: ${theme.colors.lightGray};
  }
`;

const Description = styled.span`
  color: ${theme.colors.offWhite};
`;

const CommandsPreview = ({ isOpen }) => {
  return (
    <InnerBox className={clsx({ isOpen })}>
      <aside>
        <TableContainer>
          <Table>
            <THead>
              <HeaderRow>
                <TH>Chat Command</TH>
                <TH>Description</TH>
              </HeaderRow>
            </THead>
            <TBody>
              {SERVER_COMMANDS.map(({ command, description }) => {
                return (
                  <TR key={command}>
                    <TD>
                      <Code>{command}</Code>
                    </TD>
                    <TD>
                      <Description>{description}</Description>
                    </TD>
                  </TR>
                );
              })}
            </TBody>
          </Table>
        </TableContainer>
      </aside>
    </InnerBox>
  );
};

export default CommandsPreview;
