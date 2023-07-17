import React, { useState, useEffect } from "react";
import "./../styles/Filters.css";

const Filters = ({ activeGenre, setActiveGenre, setFiltered, movies }) => {
    const [genreList, setGenreList] = useState([]);

    const fetchGenreMap = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIES_DB_API_KEY}&language=en-US`
        );
        let genreMap = await data.json();
        genreMap = genreMap["genres"];
        genreMap.unshift({ id: 0, name: "All" });
        setGenreList((_prevGenreList) => genreMap);
    };

    useEffect(() => {
        let newFiltered;
        if (activeGenre !== 0) {
            newFiltered = movies.filter((movie) => {
                return movie["genre_ids"].includes(activeGenre);
            });
        } else {
            newFiltered = movies;
        }
        setFiltered((_prevFiltered) => newFiltered);
    }, [activeGenre, movies]);

    useEffect(() => {
        fetchGenreMap();
    }, []);

    return (
        <div className="filters-container">
            {genreList.map((genre) => {
                return (
                    <button
                        key={genre.id}
                        className={activeGenre === genre.id ? "active" : ""}
                        onClick={() => setActiveGenre(genre.id)}
                    >
                        {genre.name}
                    </button>
                );
            })}
        </div>
    );
};

export default Filters;
