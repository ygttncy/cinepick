// src/pages/Watchlist.jsx
import { useApp } from "../context/AppContext";
import MovieGrid from "../components/MovieGrid";
import "./SimpleListPages.scss";

export default function Watchlist() {
  const { watchlist } = useApp();
  return (
    <main className="simple-page">
      <section className="container head">
        <h1>Daha Sonra İzle</h1>
        <p className="text-muted">{watchlist.length} film</p>
      </section>
      <section className="container">
        <MovieGrid items={watchlist} loading={false} />
        {watchlist.length === 0 && <p>Listen boş.</p>}
      </section>
    </main>
  );
}
