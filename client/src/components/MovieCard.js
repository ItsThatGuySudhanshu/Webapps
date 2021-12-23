import '../styles/MovieCard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MovieCard = ({user, watchlist, movies, setWatchlist, id, title, poster_path, overview, vote_average, vote_count, release_date, popularity}) => {
    const [inWatchlist, setInWatchlist] = useState(false);

    // checks if the movie is in the user's watchlist
    const isMovieInWatchlist = () => {
        const result = watchlist.filter(movie => (movie.id === id))
        if (result.length > 0 || inWatchlist) {
            setInWatchlist(true);
        } else {
            setInWatchlist(false);
        }
    }

    useEffect(
        () => {
            isMovieInWatchlist(); // eslint-disable-next-line
    }, [watchlist, movies]);

   // Adds a movie to the user's watchlist
    const addMovieToWatchlist = async () => {
        let movie;
        try {
            movie = await axios.post(`https://warm-bayou-22517.herokuapp.com/api/users/${user.sub.substring(6)}/watchlist/add`, {
                id,
                title,
                poster_path,
                overview,
                vote_average,
                vote_count,
                release_date,
                popularity
            });
            setInWatchlist(true);
            setWatchlist([...watchlist, movie]);
        } catch (err) {
            console.log(err);
        }
    };

    // Deletes a movie from the user's watchlist
    const removeMovieFromWatchlist = async () => {
        try {
            await axios.delete(`https://warm-bayou-22517.herokuapp.com/api/users/${user.sub.substring(6)}/watchlist/remove`, {
                data: {
                    id,
                    title,
                    poster_path,
                    overview,
                    vote_average,
                    vote_count,
                    release_date,
                    popularity
                }
            });
            const filteredMovies = watchlist.filter((movie) => movie.id !== id);
            setInWatchlist(false);
            setWatchlist(filteredMovies);
        } catch (err) {
            console.log(err);
        }
    };

    // displays the vote average
    const displayVoteAverage = (vote_average) => {
        if (vote_average >= 7.5) {
            return <span style={{marginLeft: '1.5rem', padding: '5px', color: 'green', border: '1px solid black'}}>{ vote_average }</span>
        } else if (vote_average < 7.5 && vote_average >= 5) {
            return <span style={{marginLeft: '1.5rem', padding: '5px', color: 'orange', border: '1px solid black'}}>{ vote_average }</span>
        } else {
            return <span style={{marginLeft: '1.5rem', padding: '5px', color: 'red', border: '1px solid black'}}>{ vote_average }</span>
        }
    }

    // determines if a movie is currently in the watchlist
    return (
        <div id="movie">
            <img id="movie-img" src={IMG_API + poster_path} alt={title} />
            <div id="movie-info">
                <h6><b>{ title }</b></h6>
                <p style={{paddingTop: '0.5rem'}}>
                    {new Date(release_date).toLocaleString('en-us', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}
                    {displayVoteAverage(vote_average)}
                </p>
                <Button variant="danger" onClick={ inWatchlist ? removeMovieFromWatchlist : addMovieToWatchlist }>{ inWatchlist ? '-':'+' }</Button>
            </div>
        </div>
    )
}

export default MovieCard;