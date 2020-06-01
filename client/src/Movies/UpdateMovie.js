import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';

const UpdateMovie = (props) => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [redirectToggle, setRedirectToggle] = useState(false);

    const fetchMovie = (id) => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => setMovie(res.data))
        .catch((err) => console.log(err.response));
    }

    useEffect( () => {
        console.log({params});
        fetchMovie(params.id);
    }, [params.id]);

    const handleChange = e => {
        let tempMovie = {}
        if (e.target.name === 'stars') {
            tempMovie = {
                ...movie,
                [e.target.name] : e.target.value.split(',')
            }
        }
        else {
            tempMovie = {
                ...movie, 
                [e.target.name] : e.target.value
            }
        };
        setMovie(tempMovie);
    };

    const update = e => {
        e.preventDefault();
        console.log("Put Request")
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then((res) => {
            console.log({res});
            console.log('Success');
            setRedirectToggle(true);
        })
        .catch(err => console.log({err}));
    }
    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    if (redirectToggle) {
        return <Redirect to='/'/>
    }

    return (
        <div className="save-wrapper">
            <h1>Update {movie.title}</h1>
            <form onSubmit={update}>
                <input 
                    type='text'
                    name='title'
                    placeholder='title'
                    value={movie.title}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='director'
                    placeholder='director'
                    value={movie.director}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='metascore'
                    placeholder='metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />
                <textarea 
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value={movie.stars}
                    onChange={handleChange}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;