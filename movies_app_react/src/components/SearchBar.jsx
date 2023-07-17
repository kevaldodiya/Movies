import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [searchInputValue, setSearchInputValue] = useState("");

    return (
        <div className="search-bar">
            <input
                className={`search-input ${
                    searchInputValue ? "" : "search-has-no-input"
                }`}
                type="text"
                placeholder="Search Movies"
                size="25"
                value={searchInputValue}
                onChange={(event) =>
                    setSearchInputValue(
                        (_prevSearchInputValue) => event.target.value
                    )
                }
            />

            <Link
                to={`/search/${searchInputValue}`}
                className={`search-btn ${
                    searchInputValue ? "" : "search-btn-no-input"
                }`}
            >
                Search
            </Link>
        </div>
    );
};

export default SearchBar;
