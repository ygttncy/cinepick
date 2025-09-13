// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favs") || "[]");
    } catch {
      return [];
    }
  });
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const value = useMemo(
    () => ({
      favs,
      setFavs,
      watchlist,
      setWatchlist,
    }),
    [favs, watchlist]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
