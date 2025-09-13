// src/components/Categories.jsx
import { Link } from "react-router-dom";
import {
  LuSword,
  LuFilm,
  LuMic,
  LuGhost,
  LuClapperboard,
  LuHeart,
  LuBrain,
  LuSparkles,
} from "react-icons/lu";

import "./Categories.scss";

export const GENRES = [
  { name: "Aksiyon", id: 28, icon: <LuSword />, slug: "aksiyon" },
  { name: "Macera", id: 12, icon: <LuClapperboard />, slug: "macera" },
  { name: "Animasyon", id: 16, icon: <LuSparkles />, slug: "animasyon" },
  { name: "Komedi", id: 35, icon: <LuMic />, slug: "komedi" },
  { name: "Suç", id: 80, icon: <LuFilm />, slug: "suc" },
  { name: "Belgesel", id: 99, icon: <LuFilm />, slug: "belgesel" },
  { name: "Dram", id: 18, icon: <LuBrain />, slug: "dram" },
  { name: "Aile", id: 10751, icon: <LuFilm />, slug: "aile" },
  { name: "Fantastik", id: 14, icon: <LuSparkles />, slug: "fantastik" },
  { name: "Tarih", id: 36, icon: <LuFilm />, slug: "tarih" },
  { name: "Korku", id: 27, icon: <LuGhost />, slug: "korku" },
  { name: "Müzik", id: 10402, icon: <LuMic />, slug: "muzik" },
  { name: "Gizem", id: 9648, icon: <LuGhost />, slug: "gizem" },
  { name: "Romantik", id: 10749, icon: <LuHeart />, slug: "romantik" },
  { name: "Bilim Kurgu", id: 878, icon: <LuBrain />, slug: "bilim-kurgu" },
  { name: "TV Film", id: 10770, icon: <LuFilm />, slug: "tv-film" },
  { name: "Gerilim", id: 53, icon: <LuGhost />, slug: "gerilim" },
  { name: "Savaş", id: 10752, icon: <LuSword />, slug: "savas" },
  { name: "Western", id: 37, icon: <LuSword />, slug: "western" },
];

export default function Categories({ asLinks = true, onSelect }) {
  return (
    <section className="categories">
      <div className="head container">
        <h2>Kategoriler</h2>
        <p className="text-muted">Türlere göre keşfet</p>
      </div>

      <div className="grid container">
        {GENRES.map((g) => {
          const Card = (
            <div
              className="cat-card"
              key={g.id}
              onClick={() => !asLinks && onSelect?.(g)}
            >
              <div className="icon">{g.icon}</div>
              <div className="name">{g.name}</div>
            </div>
          );
          return asLinks ? (
            <Link key={g.id} to={`/genre/${g.slug}`} className="cat-card-link">
              {Card}
            </Link>
          ) : (
            Card
          );
        })}
      </div>
    </section>
  );
}
