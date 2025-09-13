// src/pages/GenrePage.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import { GENRES } from "../components/Categories";
import MovieGrid from "../components/MovieGrid";
import AdSlot from "../components/AdSlot";

export default function GenrePage() {
  const { slug } = useParams();
  const genreObj = useMemo(() => GENRES.find((g) => g.slug === slug), [slug]);

  const { movies, loading, setQuery } = useMovies({
    genre: genreObj?.id ? String(genreObj.id) : "",
  });

  // slug değişirse sorguyu güncelle
  // (useMovies ilk mount'ta yüklediği için çoğu durumda yeterli)
  if (!genreObj) {
    return (
      <main className="container" style={{ padding: "24px 16px" }}>
        <h2>Tür bulunamadı</h2>
      </main>
    );
  }

  return (
    <main>
      <section className="container" style={{ padding: "8px 16px" }}>
        <h1>{genreObj.name}</h1>
        <p className="text-muted">Bu türe ait filmler</p>
      </section>
      <AdSlot />
      <MovieGrid items={movies} loading={loading} />
    </main>
  );
}
