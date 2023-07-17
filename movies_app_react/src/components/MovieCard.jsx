import React from "react";
import "./../styles/MovieCard.css";
import { printDate } from "./../utilities/MovieDetails";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0.3 }}
            className="movie-card"
        >
            <Link to={"/movie/" + movie.id}>
                <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                    className="movie-card-img"
                />
            </Link>
            <div className="description">
                <h2 className="movie-card-title">{movie.title}</h2>
                <p>{printDate(movie.release_date)}</p>
            </div>
        </motion.div>
    );
};

export default MovieCard;
