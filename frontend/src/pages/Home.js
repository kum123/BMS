import { Col, Row, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getAllMovies, getMovieById } from '../apicalls/movies';

const Home=() =>{
  const [movies,setMovies] = useState([]);
  const navigate = useNavigate();
  const getData =async () =>{
    try{
        const response = await getAllMovies();
        if(response.data.success){
          setMovies(response.data.movies)
        }
    }
    catch(err){
      message.error("Something went wrong")
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h1 className="text-md uppercase mb-2">Currently Showing Movies</h1>
    <Row gutter={[20]} className="mt-2">
        {movies.map((movie, i) =>(<Col span={3} key={i}>
                <div className="card flex flex-col gap-2 cursor-pointer"
                onClick={()=>{
                  navigate(`/movie/${movie._id}`)
                }} >
                    <img src={movie.poster} height={200} width={165} style={{backgroundSize: "cover"}} alt="Image poster"/>
                    <div className="flex justify-center p-1">
                        <h1 className="text-md uppercase">{movie.title}</h1>
                    </div>
                </div>
              </Col>)) }
    </Row>
    </div>
  )
}

export default Home