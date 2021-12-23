import '../styles/Watchlist.css';
import Search from './Search';
import Sort from './Sort';
import Filter from './Filter';
import MovieWatchlist from './MovieContainer'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = ({user, movies}) => {
    const [loading, setLoading] = useState(false);
    const [watchlist, setWatchlist] = useState([]);

    // Calls fetchMovieData once when the component renders
    useEffect(() => {
        // Fetches the movies for the database and the user's watchlist
        const fetchMovieData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/users/${user.sub.substring(6)}/watchlist`);
                setWatchlist(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMovieData(); // eslint-disable-next-line
    }, []);

    // Render the spinner while the page is loading
    if (loading) {
        return (
            <div className="text-center mt-5 pt-5" >
                <Spinner animation="border" size="lg" role="status" style={{ color: '#CC0000', width: '5rem', height: '5rem' }}/>
            </div>
        )
    }

    return (
        <Container className="watchlist-container">
            <Row>
                <h1 id='watchlistTitle'>My Watchlist</h1>
                <Col xs={2} id="filter-container">
                    <br></br>
                    <Search movies={watchlist} setMovies={setWatchlist}/>
                    <br></br>
                    <Sort movies={watchlist} setMovies={sortedMovies => setWatchlist([...sortedMovies])} />
                    <br></br>
                    <Filter movies={watchlist} watchlist={null} setMovies={setWatchlist} setWatchlist={null} />
                </Col>
                <Col xs={10} id="movie-container">
                    <MovieWatchlist movies={watchlist} watchlist={watchlist} setWatchlist={setWatchlist} user={user} />
                </Col>
            </Row>
        </Container>
    )
}

export default Watchlist;