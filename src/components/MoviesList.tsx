import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {useFetch} from "../hooks/useFetch";
import TableRow from "./TableRow";
import {IMovie} from "../models/IMovie";
import CustomPagination from "./CustomPagination";
import SortButtons from "./SortButtons";

const MoviesList = () => {
  const [activePage, setActivePage] = useState<number>(1)
  const { response, loading, error} = useFetch(`https://jsonmock.hackerrank.com/api/movies/search/?page=${activePage}`)
  const movies: [IMovie] = response && response.data
  const count: number = response && response.total_pages
  const [moviesStore, setMoviesStore]  = useState<IMovie[] | null>(null)
  const handleClick = (pageNum: number) => {
    setActivePage(pageNum)
  }
  useEffect(() => {
    if( response && response.data){
      setMoviesStore(response.data)
    }
  },[response])

  const sortBy = (key: keyof IMovie, type?:string) => {
    const newObj: IMovie[] = JSON.parse(JSON.stringify(movies))
    newObj.sort((a, b) => {
      if (a[key] > b[key] ) return 1
      if (a[key] < b[key]) return -1
      return 0
    })
    if(type === 'dsc'){
      newObj.reverse()
    }
    setMoviesStore(newObj)
  }



  if(moviesStore && !loading){
    return (
        <div className={'mt-3'}>
          <Table  striped bordered hover responsive={'sm'}>
            <thead>
            <tr>
              <th>Year <SortButtons onClickUp={() => sortBy("Year")} onClickDown={() => sortBy("Year",'dsc')} /></th>
              <th>Title <SortButtons onClickUp={() => sortBy("Title")} onClickDown={() => sortBy("Title",'dsc')} /></th>
            </tr>
            </thead>
            <tbody>
            {
              moviesStore.map(({imdbID,Year, Title}) => {
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
