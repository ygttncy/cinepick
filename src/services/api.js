// src/services/api.js

// --- ENV ---
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;

// --- TMDb sabitleri ---
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";
const POSTER_W = `${IMG_BASE}/w500`;
const BACKDROP_W = `${IMG_BASE}/original`;

// Türkçe -> TMDb genre ID eşlemesi (en çok kullanılanlar)
const GENRE_NAME_TO_ID = {
  Aksiyon: 28,
  Macera: 12,
  Animasyon: 16,
  Komedi: 35,
  Suç: 80,
  Belgesel: 99,
  Dram: 18,
  Drama: 18,
  Aile: 10751,
  Fantastik: 14,
  Fantezi: 14,
  Tarih: 36,
  Korku: 27,
  Müzik: 10402,
  Gizem: 9648,
  Romantik: 10749,
  "Bilim Kurgu": 878,
  "TV Film": 10770,
  Gerilim: 53,
  Savaş: 10752,
  "Vahşi Batı": 37,
  Western: 37,
};

function resolveGenreId(input) {
  if (!input) return "";
  if (/^\d+$/.test(String(input))) return String(input); // zaten ID
  return GENRE_NAME_TO_ID[input] ? String(GENRE_NAME_TO_ID[input]) : "";
}

// --- Ortak mapper ---
function tmdbMap(m) {
  return {
    id: m.id,
    title: m.title || m.original_title,
    year: (m.release_date || "").split("-")[0] || "",
    poster: m.poster_path
      ? `${POSTER_W}${m.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster",
    backdrop: m.backdrop_path ? `${BACKDROP_W}${m.backdrop_path}` : undefined,
    overview: m.overview || "",
    genres: m.genres?.map((g) => g.name) || [],
    runtime: m.runtime,
    imdb:
      typeof m.vote_average === "number"
        ? m.vote_average.toFixed(1)
        : undefined,
    director: m.credits?.crew?.find((c) => c.job === "Director")?.name,
  };
}

// --- Esnek fetch: v4 bearer varsa header, yoksa v3 api_key param ---
async function tmdbFetch(path, params = {}) {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("language", "tr-TR");

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  }

  const headers = {};
  if (TMDB_BEARER) {
    headers["Authorization"] = `Bearer ${TMDB_BEARER}`;
  } else if (TMDB_KEY) {
    url.searchParams.set("api_key", TMDB_KEY);
  } else {
    throw new Error(
      "TMDb erişimi için VITE_TMDB_BEARER veya VITE_TMDB_KEY gereklidir."
    );
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TMDb hata: ${res.status} ${res.statusText} – ${text}`);
  }
  return res.json();
}

// --- TMDb işlevleri ---
async function tmdbSearch({ q = "", genre = "", year = "", page = 1 } = {}) {
  if (q && q.trim()) {
    const json = await tmdbFetch("/search/movie", {
      query: q.trim(),
      include_adult: "false",
      page,
    });
    return {
      items: (json.results || []).map(tmdbMap),
      hasMore: json.page < json.total_pages,
    };
  } else {
    const with_genres = resolveGenreId(genre);
    const json = await tmdbFetch("/discover/movie", {
      sort_by: "popularity.desc",
      include_adult: "false",
      page,
      ...(with_genres ? { with_genres } : {}),
      ...(year ? { primary_release_year: year } : {}),
    });
    return {
      items: (json.results || []).map(tmdbMap),
      hasMore: json.page < json.total_pages,
    };
  }
}

async function tmdbGetById(id) {
  const m = await tmdbFetch(`/movie/${id}`, { append_to_response: "credits" });
  return tmdbMap(m);
}

async function tmdbSimilar(id) {
  const json = await tmdbFetch(`/movie/${id}/similar`, { page: 1 });
  return (json.results || []).map(tmdbMap).slice(0, 12);
}

async function tmdbFeatured() {
  // haftanın trendlerinden rastgele bir tane
  const json = await tmdbFetch("/trending/movie/week", {});
  const pick = (json.results || [])[
    Math.floor(Math.random() * (json.results?.length || 1))
  ];
  return pick ? tmdbMap(pick) : null;
}

async function tmdbGenerate({ genre = "", year = "" } = {}) {
  const with_genres = resolveGenreId(genre);
  const json = await tmdbFetch("/discover/movie", {
    sort_by: "vote_count.desc",
    include_adult: "false",
    page: 1,
    ...(with_genres ? { with_genres } : {}),
    ...(year ? { primary_release_year: year } : {}),
  });
  return (json.results || [])
    .map(tmdbMap)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
}

// --- Curated (kategoriye göre listeler) ---
async function tmdbCurated(slug) {
  let path = "";
  switch (slug) {
    case "popular":
      path = "/movie/popular";
      break;
    case "top":
      path = "/movie/top_rated";
      break;
    case "upcoming":
      path = "/movie/upcoming";
      break;
    case "trending":
      path = "/trending/movie/week";
      break;
    default:
      path = "/movie/popular";
  }
  const json = await tmdbFetch(path, { page: 1 });
  return (json.results || []).map(tmdbMap).slice(0, 12);
}

// --- Dışa aktarılan API (yalnızca TMDb) ---
export async function searchMovies(q) {
  return tmdbSearch(q || {});
}
export async function getById(id) {
  return tmdbGetById(id);
}
export async function getFeatured() {
  return tmdbFeatured();
}
export async function getSimilar(id) {
  return tmdbSimilar(id);
}
export async function generateBy(q) {
  return tmdbGenerate(q || {});
}
export async function getCurated(slug) {
  return tmdbCurated(slug);
}
