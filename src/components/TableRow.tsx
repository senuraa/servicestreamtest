import React from 'react';

const TableRow = ({col1, col2}:TableRowProps) => {
  return (
      <tr>
        <td>{col1}</td>
        <td className={'text-left'}>{col2}</td>
      </tr>
  );
};
type TableRowProps = {
  col1: string,
  col2: string
}
export default TableRow;
