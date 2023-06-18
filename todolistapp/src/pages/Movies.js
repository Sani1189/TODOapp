import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../style/nav.css'
import Container from 'react-bootstrap/Container'
import Nav from '../components/Nav'
import '../style/movies.css'
import Axios from 'axios';
import { useState } from 'react';
import { MdDoneOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


function Movies() {
    const { state } = useLocation();
    const { umail, uname } = state;
    const [movieName, setMovieName] = useState("");
    const [movies, setMovies] = useState([]);

    const loaddata = () => {
        Axios.get(`http://localhost:3002/getmovies/${umail}`).then((response) => {
            setMovies(response.data);
        });
    };

    useEffect(() => {
        loaddata();
    });

    let handleChange = (e) => {
        setMovieName(e.target.value);
    };
    const addmovie = () => {
        if (movieName === "") {
            toast.error("Please enter movie name!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500

            });
        } else {
            if (movies.length > 0) {
                let lowerCaseMovies = movies.map((movie) => movie.movie.toLowerCase());
                if (lowerCaseMovies.includes(movieName.toLowerCase())) {
                    toast.error("Movie already exists!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 500
                    });
                } else {
                    Axios.post("http://localhost:3002/addmovie", {
                        movie: movieName,
                        umail: umail,
                        view: "no"
                    }).then((response) => {
                        toast.success("Movie added successfully!", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 500
                        });
                        loaddata();
                    });
                }
            } else {
                Axios.post("http://localhost:3002/addmovie", {
                    movie: movieName,
                    umail: umail,
                    view: "no"
                }).then((response) => {
                    toast.success("Movie added successfully!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 500
                    });
                    loaddata();
                });
            }
        }
        setMovieName("");
    };
    const deleteMovie = (id) => () => {
        Axios.delete(`http://localhost:3002/deletemovie/${id}`).then((response) => {
            toast.success("Movie deleted successfully!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500
            });
            loaddata();
        });
    };
    const updateStatus = (id) => () => {
        Axios.put(`http://localhost:3002/updatemovie/${id}`).then((response) => {
            toast.info("Movie updated successfully!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500
            });
            loaddata();
        });
    };

    return (
        <>
            <div className="header">
                <h2>
                    user: {uname} || status: active
                </h2>
            </div>
            <Nav state={state}></Nav>

            <Container className="movies">
                <div className="movie-add">
                    <h1>Add Movie to watch</h1>
                    <input type="text" id="movieName" name="movieName" placeholder="Enter movie name" onChange={handleChange} value={movieName} />
                    <button onClick={addmovie} className="mybtn">Add</button>

                </div>
                <div className="movie-list">
                    <h1>Movie List</h1>
                    {movies.length > 0 ?
                        <ul>
                            {movies.map((movie) => (
                                <li key={movie.id}>
                                    {movie.view === "no" ?
                                        <div classname="not-watched">
                                            <span className="not-viewed">{movie.movie}</span>
                                            <button onClick={updateStatus(movie.id)} className="updatebtn">Watch Now</button>
                                            <button onClick={deleteMovie(movie.id)} className="deletebtn">Remove</button>
                                        </div>
                                        :
                                        <div className="watched">
                                            <span className="viewed">{movie.movie}</span>
                                            <h4>Already watched<MdDoneOutline /></h4>
                                            <button onClick={deleteMovie(movie.id)} className="deletebtn">Clear<TiDelete /></button>
                                        </div>
                                    }

                                </li>
                            ))}
                        </ul>
                        :
                        <h5>No movies to watch</h5>

                    }

                </div>
            </Container>
            <ToastContainer />


        </>
    );
}

export default Movies