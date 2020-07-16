import React, { useEffect, useState } from 'react';
import axios from 'axios';


const initialMovie = {
    title: '',
    director:'',
    metascore:'',
    stars:[],
};

const UpdateMovie = props => {
    const [movie, setMovie]= useState(initialMovie)

    useEffect(() => {
        const movieToUpdate = props.movieList.find(movie => {
          return String(movie.id) === props.match.params.id;})

          if (movieToUpdate) {
              setMovie(movieToUpdate)
          }
        },[props.movieList, props.match.params.id]);

        const handleChange = e => {
            let value = e.target.value;
            setMovie({
                ...movie,
                [e.target.name]: value
            })
            if(e.target.name === "stars") { 
                setMovie({...movie, stars: e.target.value.split(",")})
           }
        }

        const handleSubmit = e => {
            e.preventDefault()
            axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log("this is a put request", res.data);
                // this messes up the original array and sets it to an object
                // props.getMovieList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            window.location.href = `/movies`;
        }
    


    return (
     <div>
        <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              value={movie.title}
              onChange={handleChange}
              />
              <input
              type='text'
              name='director'
              value={movie.director}
              onChange={handleChange}
              />
              <input
              type='text'
              name='metascore'
              value={movie.metascore}
              onChange={handleChange}
              />
              <input
              type='text'
              name='stars'
              value={movie.stars}
              onChange={handleChange}
              />
              <button>Update</button>
        </form>
      </div>
    )
}

export default UpdateMovie;