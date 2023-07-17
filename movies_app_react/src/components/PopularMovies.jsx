import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./../styles/SearchBar.css";
import MoviesGrid from "./MoviesGrid";

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [pagesLoaded, setPagesLoaded] = useState(0);
    const [canLoadMoreMovies, setCanLoadMoreMovies] = useState(false);

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const fetchPopularMovies = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${
                process.env.REACT_APP_MOVIES_DB_API_KEY
            }&language=en-US&page=${pagesLoaded + 1}`
        );
        const movies = await data.json();
        console.log(movies);
        setPopularMovies((_prevPopularMovies) => {
            if (pagesLoaded > 0) {
                return _prevPopularMovies.concat(movies.results);
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
                movies={popularMovies}
                heading="Popular Movies"
                fetchMoreMovies={fetchPopularMovies}
                canLoadMoreMovies={canLoadMoreMovies}
            />
        </>
    );
};

export default PopularMovies;
