import React, {useState} from 'react';
import {Table} from "react-bootstrap";
import {useFetch} from "../hooks/useFetch";
import TableRow from "./TableRow";
import {IMovie} from "../models/IMovie";
import CustomPagination from "./CustomPagination";

const MoviesList = () => {
  const [activePage, setActivePage] = useState<number>(1)
  const { response, loading, error} = useFetch(`https://jsonmock.hackerrank.com/api/movies/search/?page=${activePage}`)
  const movies: [IMovie] = response && response.data
  const count: number = response && response.total_pages

  const handleClick = (pageNum: number) => {
    setActivePage(pageNum)
  }
  if(movies && !loading){
    return (
        <div className={'mt-3'}>
          <Table  striped bordered hover>
            <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {
              movies.map(({imdbID,Year, Title}) => {
                return <TableRow key={imdbID}  col1={Year} col2={Title}/>
              })
            }
            </tbody>
          </Table>
          <CustomPagination nOfPages={count} activePage={activePage} onClick={handleClick} />
        </div>
    );
  }else if(loading){
    return <h4>Loading...</h4>
  }else {
    return (
        <>
          <h4>Error getting the list</h4>
          <label>{error}</label>
        </>
    )
  }
};

export default MoviesList;
