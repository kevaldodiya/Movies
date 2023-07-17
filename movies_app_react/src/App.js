import PopularMovies from "./components/PopularMovies";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MovieDetails from "./components/MovieDetails";
import { AnimatePresence } from "framer-motion";
import SearchResults from "./components/SearchResults";

function App() {
    return (
        <div className="App">
            <header>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                    <h1 className="app-header">Movies App</h1>
                </Link>
            </header>
            <AnimatePresence>
                <Routes>
                    <Route path="/" element={<PopularMovies />} exact />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/search/:id" element={<SearchResults />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
