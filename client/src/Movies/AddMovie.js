import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const AddMovie = () => {
    const [formValues, setFormValues] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: ['']
    });
    const [redirectToggle, setRedirectToggle] = useState(false);

    const handleChange = e => {
        let tempMovie = {}
        if (e.target.name === 'stars') {
            tempMovie = {
                ...formValues,
                [e.target.name] : e.target.value.split(',')
            }
        }
        else {
            tempMovie = {
                ...formValues, 
                [e.target.name] : e.target.value
            }
        };
        setFormValues(tempMovie)
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log("POST request");
        axios.post(`http://localhost:5000/api/movies/`, formValues)
        .then( (res)=> {
            console.log({res});
            setRedirectToggle(true);
        })
        .catch(err => console.log({err}));
    }

    if (redirectToggle) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <h1>Add New Movie</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type='text'
                    name='title'
                    placeholder='title'
                    value={formValues.title}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='director'
                    placeholder='director'
                    value={formValues.director}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='metascore'
                    placeholder='metascore'
                    value={formValues.metascore}
                    onChange={handleChange}
                />
                <textarea 
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value={formValues.stars}
                    onChange={handleChange}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;