// src/pages/Favorites.jsx
import { useApp } from "../context/AppContext";
import MovieGrid from "../components/MovieGrid";
import "./SimpleListPages.scss";

export default function Favorites() {
  const { favs } = useApp();
  return (
    <main className="simple-page">
      <section className="container head">
        <h1>Favorilerim</h1>
        <p className="text-muted">{favs.length} film</p>
      </section>
      <section className="container">
        <MovieGrid items={favs} loading={false} />
        {favs.length === 0 && <p>Henüz favori eklemedin.</p>}
      </section>
    </main>
  );
}
