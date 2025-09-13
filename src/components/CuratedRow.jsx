import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getCurated } from "../services/api";
import { Link } from "react-router-dom";
import "./CuratedRow.scss";

export default function CuratedRow({ slug, title }) {
  const [items, setItems] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    getCurated(slug).then(setItems);
  }, [slug]);

  // 👇 Ok butonları için scroll helper
  const scrollBy = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85; // görünür alanın %85'i kadar kaydır
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="curated container">
      <div className="head">
        <h3>{title}</h3>
        <div className="arrows">
          <button onClick={() => scrollBy(-1)}>◀</button>
          <button onClick={() => scrollBy(1)}>▶</button>
        </div>
      </div>

      <div className="track" ref={trackRef}>
        {items.map((m, i) => (
          <motion.div
            key={m.id}
            className="cell"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <Link to={`/movie/${m.id}`} className="thumb">
              <img src={m.poster} alt={m.title} loading="lazy" />
            </Link>
            <div className="t">{m.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
