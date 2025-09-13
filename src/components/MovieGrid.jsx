import SkeletonCard from "./SkeletonCard";
import MovieCard from "./MovieCard";
import "./MovieGrid.scss";

export default function MovieGrid({ items, loading }) {
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid">
      {items.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}
