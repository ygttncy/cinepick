// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 16px" }}>
      <h1>404</h1>
      <p>Aradığın sayfayı bulamadık.</p>
      <Link to="/" className="btn outline" style={{ marginTop: 12 }}>
        Ana sayfaya dön
      </Link>
    </main>
  );
}
