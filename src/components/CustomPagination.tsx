import React from 'react';
import {Form, Pagination} from "react-bootstrap";

const CustomPagination = ({nOfPages, activePage, onClick, onChange}:CustomPaginationProps) => {
  const nPages = [...Array(nOfPages+1).keys()].slice(1)
  return (
      <Pagination>
        <Pagination.First onClick={() => onClick(1)}/>
        <Pagination.Prev onClick={() => activePage >= 2 && onClick(activePage - 1)}/>
        <Form.Select onChange={onChange} value={activePage}>
          {
            nPages.map(pageNo => {
              const label = `${pageNo} of ${nOfPages}`
              return <option value={pageNo.toString()}>{label}</option>
            })
          }
        </Form.Select>
        <Pagination.Next onClick={() => activePage < nOfPages && onClick(activePage + 1)}/>
        <Pagination.Last onClick={() => onClick(nOfPages)}/>
      </Pagination>
  );
};

type CustomPaginationProps = {
  nOfPages: number,
  activePage: number,
  onClick: (page: number) => void,
  onChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void
}

export default CustomPagination;
