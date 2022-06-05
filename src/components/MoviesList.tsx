import React, {useEffect, useState} from 'react';
import {Col, Form, Table} from "react-bootstrap";
import {useFetch} from "../hooks/useFetch";
import TableRow from "./TableRow";
import {IMovie} from "../models/IMovie";
import CustomPagination from "./CustomPagination";
import SortButtons from "./SortButtons";

const MoviesList = () => {
  const [activePage, setActivePage] = useState<number>(1)
  const {response, loading, error} = useFetch(`https://jsonmock.hackerrank.com/api/movies/search/?page=${activePage}`)
  const movies: [IMovie] = response && response.data
  const count: number = response && response.total_pages
  const [moviesStore, setMoviesStore] = useState<IMovie[] | null>(null)
  const [searchText, setSearchText] = useState<SearchText>({
    year: '',
    title: ''
  })
  const {year: sYear, title: sTitle} = searchText

  const handleClick = (pageNum: number) => {
    setActivePage(pageNum)
  }
  useEffect(() => {
    if (response && response.data) {
      setMoviesStore(response.data)
    }
  }, [response])

  const sortBy = (key: keyof IMovie, type?: string) => {
    const newObj: IMovie[] = JSON.parse(JSON.stringify(movies))
    newObj.sort((a, b) => {
      if (a[key] > b[key]) return 1
      if (a[key] < b[key]) return -1
      return 0
    })
    if (type === 'dsc') {
      newObj.reverse()
    }
    setMoviesStore(newObj)
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,type: string) => {
    setSearchText(prevState => ({
      ...prevState,
      [type]: event.target.value
    }))
  }

  const filteredData = moviesStore && moviesStore.filter((movie)=>{
    if(sYear && sTitle) {
      return movie.Year.toString() === searchText.year && movie.Title.toLowerCase() === searchText.title.toLowerCase()
    }else if(sYear && !sTitle){
      return movie.Year.toString() === searchText.year
    } else if(!sYear && sTitle){
      return movie.Title.toLowerCase() === searchText.title.toLowerCase()
    }
    else{ return true}
  })
  if (filteredData && !loading) {
    return (
        <div className={'mt-3'}>
          <Form className={'mb-3'}>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Filter by Year</Form.Label>
                <Form.Control type="number" placeholder="Enter year" value ={sYear} onChange={(event) => onChange(event,'year') }/>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Filter by Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value = {sTitle} onChange={(event)=> onChange(event,'title')}/>
              </Form.Group>
            </Col>
          </Form>
          <Table striped bordered hover responsive={'sm'}>
            <thead>
            <tr>
              <th>Year <SortButtons onClickUp={() => sortBy("Year")} onClickDown={() => sortBy("Year", 'dsc')}/></th>
              <th>Title <SortButtons onClickUp={() => sortBy("Title")} onClickDown={() => sortBy("Title", 'dsc')}/></th>
            </tr>
            </thead>
            <tbody>
            {
              filteredData.map(({imdbID, Year, Title}) => {
                return <TableRow key={imdbID} col1={Year} col2={Title}/>
              })
            }
            </tbody>
          </Table>
          <CustomPagination nOfPages={count} activePage={activePage} onClick={handleClick}/>
        </div>
    );
  } else if (loading) {
    return <h4>Loading...</h4>
  } else {
    return (
        <>
          <h4>Error getting the list</h4>
          <label>{error}</label>
        </>
    )
  }
};

interface SearchText {
  year: string,
  title: string
}

export default MoviesList;
