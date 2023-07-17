import React from "react";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import "./../styles/MoviesGrid.css";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "./Filters";
import "./../styles/SearchBar.css";

const MoviesGrid = ({
    movies,
    heading,
    fetchMoreMovies,
    canLoadMoreMovies,
}) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [activeGenre, setActiveGenre] = useState(0);
    useEffect(() => {
        setFilteredMovies((_prevFilteredMovies) => {
            if (_prevFilteredMovies !== []) {
                return _prevFilteredMovies;
            }
            return movies;
        });
    }, [movies]);
    const loadMoreMovies = (_) => {
        fetchMoreMovies();
    };
    return (
        <>
            <Filters
                movies={movies}
                setFiltered={setFilteredMovies}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
            />
            <div className="movies-container">
                <h2 className="movies-header">{heading}</h2>
                <motion.div layout className="movies">
                    <AnimatePresence>
                        {filteredMovies.map((movie) => {
                            return <MovieCard key={movie.id} movie={movie} />;
                        })}
                    </AnimatePresence>
                </motion.div>
                {canLoadMoreMovies ? (
                    <div className="movies-container-footer">
                        <div className="btn-load-more" onClick={loadMoreMovies}>
                            Load More
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default MoviesGrid;
