import React from 'react';
import {Pagination} from "react-bootstrap";

const CustomPagination = ({nOfPages, activePage, onClick}:CustomPaginationProps) => {
  const nPages = [...Array(nOfPages + 1).keys()].slice(1)
  return (
      <Pagination>
        <Pagination.Prev onClick={() => onClick(activePage - 1)}/>
        {
          nPages.map(page => {
            if(page < 21){
              return <Pagination.Item key={`pagination_${page}`} active={page === activePage} onClick={() => onClick(page)}>{page}</Pagination.Item>
            }else{
              return null
            }
          })
        }
        <Pagination.Next onClick={() => onClick(activePage + 1)}/>
      </Pagination>
  );
};

type CustomPaginationProps = {
  nOfPages: number,
  activePage: number,
  onClick: (page: number) => void
}

export default CustomPagination;
