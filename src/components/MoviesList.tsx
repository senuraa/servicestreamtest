import React from 'react';
import {Table} from "react-bootstrap";
import {useFetch} from "../hooks/useFetch";
import TableRow from "./TableRow";
import {IMovie} from "../models/IMovie";

const MoviesList = () => {
  const { response, loading, error} = useFetch('https://jsonmock.hackerrank.com/api/movies/search/?page=1')

  const movies: [IMovie] = response && response.data

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
                return <TableRow key={imdbID} year={Year} title={Title} />
              })
            }
            </tbody>
          </Table>
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
