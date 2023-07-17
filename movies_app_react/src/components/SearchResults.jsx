import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./../styles/SearchBar.css";
import MoviesGrid from "./MoviesGrid";

const SearchResults = () => {
    let { id } = useParams();
    const [searchMovies, setSearchMovies] = useState([]);
    const [pagesLoaded, setPagesLoaded] = useState(0);
    const [canLoadMoreMovies, setCanLoadMoreMovies] = useState(false);

    useEffect(() => {
        fetchSearchMovies();
    }, [id]);

    const fetchSearchMovies = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${
                process.env.REACT_APP_MOVIES_DB_API_KEY
            }&language=en-US&query=${id}&page=${
                pagesLoaded + 1
            }&include_adult=false&`
        );
        const movies = await data.json();
        console.log(movies);
        setSearchMovies((_prevSearchMovies) => {
            if (pagesLoaded) {
                return _prevSearchMovies.concat(movies.results);
            }
            return movies.results;
        });
        setPagesLoaded((_prevPagesLoaded) => movies.page);
        setCanLoadMoreMovies(
            (_prevCanLoadMoreMovies) => movies.page < movies.total_pages
        );
    };

    return (
        <>
            <SearchBar />
            <MoviesGrid
                movies={searchMovies}
                heading={`Searched: ${id}`}
                fetchMoreMovies={fetchSearchMovies}
                canLoadMoreMovies={canLoadMoreMovies}
            />
        </>
    );
};

export default SearchResults;
