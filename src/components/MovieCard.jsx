import { Link } from "react-router-dom";
import { FiHeart, FiClock } from "react-icons/fi";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import "./MovieCard.scss";

export default function MovieCard({ movie }) {
  const { favs, setFavs, watchlist, setWatchlist } = useApp();
  const isFav = favs.some((m) => String(m.id) === String(movie.id));
  const inWatch = watchlist.some((m) => String(m.id) === String(movie.id));

  const toggleFav = () => {
    setFavs((prev) =>
      isFav
        ? prev.filter((m) => String(m.id) !== String(movie.id))
        : [movie, ...prev]
    );
  };

  const toggleWatch = () => {
    setWatchlist((prev) =>
      inWatch
        ? prev.filter((m) => String(m.id) !== String(movie.id))
        : [movie, ...prev]
    );
  };

  // Hover tilt + shine
  const cardRef = useRef(null);
  const [shine, setShine] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const onMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setShine({ x, y });
    const rx = (y / rect.height - 0.5) * -10;
    const ry = (x / rect.width - 0.5) * 10;
    setTilt({ rx, ry });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.article
      ref={cardRef}
      className="movie-card"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.45 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <Link to={`/movie/${movie.id}`} className="poster">
          <img src={movie.poster} alt={movie.title} loading="lazy" />
          {/* Shine */}
          <div
            className="shine"
            style={{
              position: "absolute",
              left: shine.x - 200,
              top: shine.y - 200,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(closest-side, rgba(255,255,255,.18), rgba(255,255,255,0))",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
        </Link>
      </motion.div>

      <div className="meta">
        <Link to={`/movie/${movie.id}`} className="title">
          {movie.title}
        </Link>
        {!!movie.year && <span className="year">{movie.year}</span>}
      </div>

      <div className="actions">
        <div className="left">
          {!!movie.rating && (
            <motion.span
              className="rating"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              title="Puan"
            >
              ⭐ {Number(movie.rating).toFixed(1)}
            </motion.span>
          )}
        </div>
        <div className="right">
          <button
            className={isFav ? "active" : ""}
            onClick={toggleFav}
            title={isFav ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            <FiHeart color="#fff" />
          </button>
          <button
            className={inWatch ? "active" : ""}
            onClick={toggleWatch}
            title={inWatch ? "Listeden çıkar" : "İzleme listesine ekle"}
          >
            <FiClock color="#fff" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
