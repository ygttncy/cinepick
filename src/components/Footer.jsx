// src/components/Footer.jsx
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <p>
          © {new Date().getFullYear()} CinePick · İlginç ve gözden kaçmış
          filmler
        </p>
        <a href="https://github.com/ygttncy" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
