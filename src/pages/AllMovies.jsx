// src/pages/AllMovies.jsx
import { useEffect, useRef } from "react";
import useMovies from "../hooks/useMovies";
import Filters from "../components/Filters";
import MovieGrid from "../components/MovieGrid";
import AdSlot from "../components/AdSlot";
import "./AllMovies.scss";

export default function AllMovies() {
  const { movies, loading, hasMore, page, setQuery, loadMore } = useMovies({
    // başlangıçta popüler tüm filmler (discover)
    q: "",
    genre: "",
    year: "",
    page: 1,
  });

  // Sonsuz kaydırma için gözlemci
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const ob = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { rootMargin: "800px 0px 0px 0px" }
    );
    ob.observe(sentinelRef.current);
    return () => ob.disconnect();
  }, [hasMore, loading, loadMore]);

  return (
    <main className="all-movies">
      <section className="header container">
        <h1>Tüm Filmler</h1>
        <p className="text-muted">
          Popülerlik sırasına göre listelenir. Filtreleri kullanarak daralt.
        </p>
      </section>

      <section className="container">
        <Filters onChange={setQuery} />
      </section>

      <AdSlot />

      <section className="container">
        <MovieGrid items={movies} loading={loading} />
        {/* Sonsuz kaydırma tetikleyicisi */}
        {hasMore && (
          <div ref={sentinelRef} className="infinite-sentinel" aria-hidden />
        )}
        {/* Güvenlik için buton (isteğe bağlı) */}
        {hasMore && (
          <div className="loadmore-fallback">
            <button disabled={loading} onClick={loadMore}>
              {loading ? "Yükleniyor…" : `Daha Fazla Yükle (sayfa ${page + 1})`}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
