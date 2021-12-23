import '../styles/Movies.css';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MovieDatabase from './MovieContainer';
import Search from './Search';
import Sort from './Sort';
import Filter from './Filter';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = ({user}) => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    // Calls fetchMovieData once when the component renders
    useEffect(() => {
        // Fetches the movies for the database and the user's watchlist
        const fetchMovieData = async () => {
        try {
            setLoading(true);
            const movies = await axios.get('/api/movies');
            setMovies(movies.data);
            const watchlistResponse = await axios.get(`/api/users/${user.sub.substring(6)}/watchlist`);
            setWatchlist(watchlistResponse.data);
            setLoading(false);
            console.log(user);
        } catch (err) {
            console.log(err);
        }
    };
    fetchMovieData(); // eslint-disable-next-line
}, []);

if (loading) {
    return (
        <div className="text-center mt-5 pt-5" >
            <Spinner animation="border" size="lg" role="status" style={{ color: '#CC0000', width: '5rem', height: '5rem' }}/>
        </div>
        )
    }

    return (
        <Container className="movie-page">
            <Row>
                <h1 id='moviesPageTitle'>Popular Movies</h1>
                <Col xs={2}>
                    <br></br>
                    <Search movies={movies} setMovies={setMovies}/>
                    <br></br>
                    <Sort movies={movies} setMovies={sortedMovies => setMovies([...sortedMovies])} />
                    <br></br>
                    <Filter movies={movies} watchlist={watchlist} setMovies={setMovies} setWatchlist={setWatchlist} />
                </Col>
                <Col xs={10}>
                    <div id="container-border">
                        <MovieDatabase movies={movies} watchlist={watchlist} setWatchlist={setWatchlist} user={user} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Movies;