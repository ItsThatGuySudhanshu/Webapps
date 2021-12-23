import '../styles/Search.css';
import React, { useState } from 'react'

const Search = ({movies, setMovies}) => {
    const [database] = useState(movies);
    const updateSearch = (e) => {
        const searchKey = document.getElementById("searchBar").value;
        if (e.nativeEvent.inputType === "deleteContentBackward") {
            if (searchKey !== "") {
                const filtered = database.filter(movie => {
                    return movie.title.toLowerCase().includes(searchKey.toLowerCase())
                });
                return filtered
            }
            else {
                return database
            }
        }
        else {
            const filtered = movies.filter(movie => {
                return movie.title.toLowerCase().includes(searchKey.toLowerCase())
            });
            return filtered
        }
    }
    return (
        <div>
           <input id="searchBar" type="text" placeholder="Search" onChange={(e) => setMovies(updateSearch(e))}/> 
        </div>
    )
};

export default Search;
