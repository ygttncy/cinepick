import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getById, getSimilar } from "../services/api";
import { FiHeart, FiClock, FiArrowLeft } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import MovieCard from "../components/MovieCard"; // grid'de kart kullanacağız
import "./MovieDetail.scss";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const { favs, setFavs, watchlist, setWatchlist } = useApp();

  const isFav = movie && favs.some((m) => String(m.id) === String(movie.id));
  const inWatch = movie && watchlist.some((m) => String(m.id) === String(movie.id));

  useEffect(() => {
    getById(id).then(setMovie);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getSimilar(id).then(setSimilar).catch(() => setSimilar([]));
  }, [id]);

  if (!movie) {
    return (
      <main className="detail container">
        <div className="loading">Yükleniyor…</div>
      </main>
    );
  }

  const toggleFav = () =>
    setFavs((prev) =>
      isFav ? prev.filter((m) => String(m.id) !== String(movie.id)) : [movie, ...prev]
    );

  const toggleWatch = () =>
    setWatchlist((prev) =>
      inWatch ? prev.filter((m) => String(m.id) !== String(movie.id)) : [movie, ...prev]
    );

  return (
    <main className="detail container">
      <motion.div
        className="backline"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Link to="/" className="back">
          <FiArrowLeft /> Geri
        </Link>
      </motion.div>

      <section className="wrap">
        <motion.div
          className="poster"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          whileHover={{ scale: 1.02 }}
        >
          <img src={movie.poster} alt={movie.title} loading="lazy" />
          {movie.imdb && (
            <motion.span
              className="badge"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.35 }}
            >
              ⭐ {movie.imdb}
            </motion.span>
          )}
        </motion.div>

        <div className="info">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {movie.title}
          </motion.h1>

          <motion.p
            className="meta"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            {movie.year} • {movie.genres?.join(" / ")}
          </motion.p>

          <motion.p
            className="overview"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {movie.overview}
          </motion.p>

          <motion.div
            className="actions"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            <motion.button
              className={isFav ? "btn active" : "btn"}
              whileTap={{ scale: 0.97 }}
              onClick={toggleFav}
            >
              <FiHeart /> {isFav ? "Favorilerde" : "Favorilere Ekle"}
            </motion.button>

            <motion.button
              className={inWatch ? "btn active" : "btn"}
              whileTap={{ scale: 0.97 }}
              onClick={toggleWatch}
            >
              <FiClock /> {inWatch ? "Listemde" : "İzleme Listeme Ekle"}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Benzer Filmler */}
      <section className="similar">
        <h2>Benzer Filmler</h2>
        <div className="grid">
          {similar.length > 0 ? (
            similar.map((m) => <MovieCard key={m.id} movie={m} />)
          ) : (
            <div style={{ opacity: 0.7, padding: "8px 0" }}>
              Benzer film bulunamadı.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
