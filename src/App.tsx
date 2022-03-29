import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "./types";
import { motion, AnimatePresence } from "framer-motion";

function Filter({
  movies,
  setFilterd,
  active,
  setActive,
}: {
  movies: Movie[];
  setFilterd: React.Dispatch<React.SetStateAction<Movie[]>>;
  active: number;
  setActive: (n: number) => void;
}) {
  useEffect(() => {
    if (active === 0) {
      setFilterd(movies);
      return;
    }
    const filtered = movies.filter((m) => m.genre_ids.includes(active));
    setFilterd(filtered);
  }, [active, movies, setFilterd]);
  console.log(active);
  return (
    <div className="filter__container">
      <button
        className={active === 0 ? "active" : ""}
        onClick={() => setActive(0)}>
        All
      </button>
      <button
        className={active === 35 ? "active" : ""}
        onClick={() => setActive(35)}>
        Comedy
      </button>
      <button
        className={active === 28 ? "active" : ""}
        onClick={() => setActive(28)}>
        Action
      </button>
    </div>
  );
}

function App() {
  const API_KEY = "fa709d2ae4fdd55460fa7a306a8d152c";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterd, setFilterd] = useState<Movie[]>([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      setMovies(data.results as Movie[]);
      setFilterd(data.results as Movie[]);
    };

    fetchData();
  }, []);
  return (
    <div className="">
      <Filter
        movies={movies}
        setFilterd={setFilterd}
        active={active}
        setActive={setActive}
      />
      <motion.div layout className="popular__movies">
        <AnimatePresence>
          {filterd.map((movie) => (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              key={movie.id}
              layout
              className="movie__item">
              <h2>{movie.title}</h2>
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                alt=""
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
