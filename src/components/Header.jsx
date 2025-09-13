import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeatured } from "../services/api";
import { FiShuffle } from "react-icons/fi";
import "./Header.scss";

export default function Header() {
  const [item, setItem] = useState(null);
  useEffect(() => {
    getFeatured().then(setItem);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const blur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(6px)"]);

  return (
    <section className="hero">
      <div className="overlay" />
      <motion.img
        className="bg"
        src={item?.backdrop || "/assets/hero-bg.jpg"}
        alt={item?.title || "Featured"}
        style={{ y, filter: blur }}
      />

      <div className="content">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {item?.title || "Keşfedilmemiş Filmler"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {item?.overview || "Trendlerin dışında kalan ama etkisi büyük öneriler."}
        </motion.p>

        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
        >
          <a href="#generator" className="btn primary">
            <FiShuffle /> Rastgele Öner
          </a>
          {item && (
            <a className="btn outline" href={`/movie/${item.id}`}>
              Detaya Git
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
