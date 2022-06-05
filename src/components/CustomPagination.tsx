import React from 'react';
import {Form, Pagination} from "react-bootstrap";

const CustomPagination = ({nOfPages, activePage, onClick, onChange}:CustomPaginationProps) => {
  const nPages = [...Array(nOfPages).keys()].slice(1)
  return (
      <Pagination>
        <Pagination.Prev onClick={() => onClick(activePage - 1)}/>
        <Form.Select onChange={onChange} value={activePage}>
          {
            nPages.map(pageNo => {
              const label = `${pageNo} of ${nOfPages}`
              return <option value={pageNo.toString()}>{label}</option>
            })
          }
        </Form.Select>
        <Pagination.Next onClick={() => onClick(activePage + 1)}/>
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
