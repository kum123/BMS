
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getMovieById } from '../../apicalls/movies';
import { GetAllTheatersForMovie } from '../../apicalls/theaters';
import moment from 'moment';
import { message } from 'antd'

const TheatersForMovie = () => {


    const [movie,setMovie] = useState({});
    const [theaters,setTheaters] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const getData =async()=>{
        try {
            const response = await getMovieById(params.id);
            const theaterResponse = await GetAllTheatersForMovie({movieId: params.id})

            if(response.data.success){
                setMovie(response.data.movie)
            }else{
                message.error("Something went wrong while fetching movie details");
            }
            if(theaterResponse.data.success){
                    setTheaters(theaterResponse.data.theaters);
            }else{
                message.error("Something went wrong while theaters");
            }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        <div className='flex justify-between items-center mb-2'>
                <div>
                    <h1 className='text-2xl uppercase'>
                        {movie.title} {movie.language}
                    </h1>
                    <h1 className='text-md'>
                       Duration : {movie.duration} mins 
                    </h1>
                    <h1 className='text-md'>
                       Release Date : {moment(movie.releaseDate).format("MMM dd yyyy")}  
                    </h1>
                    <h1 className='text-md'> Genre:{movie.genre}</h1>
                </div>
        </div>
        <div className="mt-1">
          <h1 className="text-xl uppercase">Theatres</h1>
        </div>

        <div className="mt-1 flex flex-col gap-1">
          {theaters.map((theater,index) => (
            <div className="card p-2" key={index}>
              <h1 className="text-md uppercase">{theater.name}</h1>
              <h1 className="text-sm">Address : {theater.address}</h1>

              <div className="divider"></div>

              <div className="flex gap-2">
                {theater.shows
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <div key={show._id} style={{
                      backgroundColor: isHovering ? '#DF1827' : 'white',
                      color: isHovering ? 'white' : '#DF1827',
                    }}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                      className="card p-1 cursor-pointer border-primary"
                      onClick={() => {
                        navigate(`/book-show/${show._id}`);
                      }}
                    >
                      <h1 className="text-sm">
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>))}

            </div>

    </div>
  )
}

export default TheatersForMovie
