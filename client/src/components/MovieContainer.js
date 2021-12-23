import '../styles/MovieContainer.css';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Container, Row } from 'react-bootstrap';
import MovieCard from './MovieCard';

const MovieContainer = ({user, movies, watchlist, setWatchlist}) => {
    const moviesPerPage = 12;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * moviesPerPage;

    const displayMovies = movies
        .slice(pagesVisited, pagesVisited + moviesPerPage)
        .map((movie) => {
            return (
                <MovieCard key={movie.id} user={user} watchlist={watchlist} movies={movies} setWatchlist={setWatchlist} className="box" {...movie} />
            )
    });
    
    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const pageCount = Math.ceil(movies.length / moviesPerPage);
    return (
        <Container className="movie-container">
            <Row>
                { movies.length > 0 &&
                    displayMovies
                }
            </Row>
            <Row id="pageButtons">
                { movies.length > 0 &&
                    <ReactPaginate 
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    />
                }
            </Row>
        </Container>
    )
};

export default MovieContainer
