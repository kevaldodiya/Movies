import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    printDate,
    formatMoneyCount,
    formatVoteCount,
    printTime,
} from "./../utilities/MovieDetails";
import "./../styles/MovieDetails.css";

const MovieDetails = () => {
    let { id } = useParams();

    const [movieDetails, setMovieDetails] = useState(null);

    const loadMovieDetails = async () => {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIES_DB_API_KEY}&language=en-US`
        );
        const movieDetails = await res.json();
        setMovieDetails((_prevMovieDetails) => movieDetails);
        console.log(movieDetails);
        return;
    };

    useEffect(() => {
        loadMovieDetails();
    }, []);

    if (movieDetails == null) {
        return (
            <div className="movie-details">
                <h3>Loading Details ...</h3>
            </div>
        );
    }

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0.3 }}
            className="movie-details"
        >
            <div className="movie-details-img-container">
                <img
                    src={
                        "https://image.tmdb.org/t/p/original" +
                        movieDetails.backdrop_path
                    }
                    alt="movieDetails.title"
                />
            </div>
            <div className="data-container">
                <h1 className="movie-details-title">{movieDetails.title}</h1>
                <div className="movie-details-numbers">
                    <div className="movie-details-number-items">
                        <span>Release Date: </span>
                        {printDate(movieDetails.release_date)}
                    </div>
                    <div className="movie-details-number-items">
                        <span>Rating: </span>
                        {movieDetails.vote_average}/10 (
                        {formatVoteCount(movieDetails.vote_count)} votes)
                    </div>
                    <div className="movie-details-number-items">
                        <span>Budget: </span>
                        {movieDetails.budget === 0
                            ? "-"
                            : formatMoneyCount(movieDetails.budget)}
                    </div>
                    <div className="movie-details-number-items">
                        <span>Runtime: </span>
                        {printTime(movieDetails.runtime)} mins
                    </div>
                    <div className="movie-details-number-items genres">
                        <span>Genres: </span>
                        {movieDetails["genres"].map((genre, i) => {
                            if (i !== movieDetails["genres"].length - 1) {
                                return genre.name + ", ";
                            }
                            return genre.name;
                        })}
                    </div>
                </div>
                <p className="movie-detail-description">
                    {movieDetails.overview}
                </p>
            </div>
        </motion.div>
    );
};

export default MovieDetails;
