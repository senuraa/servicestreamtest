import React from 'react';

const TableRow = ({year, title}:TableRowProps) => {
  return (
      <tr>
        <td>{year}</td>
        <td>{title}</td>
      </tr>
  );
};
type TableRowProps = {
  year: string,
  title: string
}
export default TableRow;
