import React from 'react';
import styled from 'styled-components';

import { Code, SERVER_COMMANDS, theme } from './common';

const TableContainer = styled.div`
  color: ${theme.colors.gold};
  font-size: 16px;
  margin: 0 auto;
  width: 95%;
`;

const Table = styled.table`
  font-size: inherit;
`;

const TBody = styled.tbody``;

const stylesThTd = `
  border-bottom-color: ${theme.colors.goldPale};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.4rem;
  padding-bottom: calc(0.4rem - 1px);
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

const CommandsPreview = () => {
  return (
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
  );
};

export default CommandsPreview;
