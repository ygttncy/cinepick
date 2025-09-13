// src/hooks/useMovies.jsx
import { useEffect, useState, useCallback } from "react";
import { searchMovies } from "../services/api";

export default function useMovies(initialQuery = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(
    async (q = query, p = 1) => {
      setLoading(true);
      try {
        const res = await searchMovies({ ...q, page: p });
        const items = res.items || res.results || [];
        setMovies(p === 1 ? items : (prev) => [...prev, ...items]);
        setHasMore(
          Boolean(
            res.hasMore ??
              (res.page && res.total_pages
                ? res.page < res.total_pages
                : items.length > 0)
          )
        );
        setPage(p);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  // query değiştiğinde baştan yükle
  useEffect(() => {
    load(initialQuery, 1); /* eslint-disable-next-line */
  }, []); // ilk mount
  useEffect(() => {
    load(query, 1);
  }, [query, load]);

  const loadMore = () => {
    if (!loading && hasMore) load(query, page + 1);
  };

  return { movies, loading, hasMore, page, setQuery, loadMore };
}
