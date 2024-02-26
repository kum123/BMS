import React, { useEffect, useState } from "react";
// import Button from "../../components/Button";
import MovieForm from "./MovieForm";
import moment from "moment";
import { Button, message, Table } from "antd";
import { useDispatch } from "react-redux";
import { DeleteMovie, getAllMovies } from "../../apicalls/movies";
// import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
//  import { DeleteMovie, GetAllMovies } from "../../apicalls/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const getData = async (req, res) => {
    try {
        const { data } = await getAllMovies()

        if(data.success) {
            setMovies(data.movies)
        } else {
            message.error("There was some issue in fetching movies!")
        }
    } catch (error) {
        message.error("There was some issue in fetching movies!")
    }
 }

  useEffect(() => {
 

    getData();
  }, []);


    const handleDelete = async (movieId) => {
        try {
            const response = await DeleteMovie(movieId);
            if(response.data.success) {
                message.success("Movie Deleted Sucessfully!")
                getData()
            } else {
                message.error("Something went wrong!")
            }
        } catch (error) {
            console.log(error)
            message.error("Something went wrong!")
        }
    }

  const columns = [
    {
      title: "Current Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return (
          <img
            src={record.poster}
            alt="poster"
            height="60"
            width="80"
            className="br-1"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        console.log({ text })
        return (
          <div className="flex gap-1">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                // console.log({ record })
                setSelectedMovie(record);
                setFormType("edit");
                setShowMovieFormModal(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
        >Add Movie</Button>
      </div>

      {/* Datasource is nothing but an array of Objects 
      Representating Movies
      [{ id: 1, poster:"", title: "ABC"}, { id: 2, title: "DEF"}]
      */}



      <Table columns={columns} dataSource={movies} />

      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
         getData={getData}
        />
      )}
    </div>
  );
}

export default MoviesList;
