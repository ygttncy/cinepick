import { useState } from "react";
import "./Filters.scss";

export default function Filters({ onChange }) {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  function apply() {
    onChange({ q, genre, year });
  }

  return (
    <div className="filters">
      <input
        placeholder="Film / yönetmen ara"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Tür (hepsi)</option>
        <option>Drama</option>
        <option>Bilim Kurgu</option>
        <option>Gerilim</option>
        <option>Komedi</option>
        <option>Korku</option>
      </select>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Yıl</option>
        {Array.from({ length: 2025 - 1970 + 1 }, (_, i) => 1970 + i)
          .reverse()
          .map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
      </select>
      <button className="btn primary" onClick={apply}>
        Filtrele
      </button>
      <a href="#generator" className="btn outline">
        Generator
      </a>
    </div>
  );
}
