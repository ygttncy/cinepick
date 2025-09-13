import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.scss";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const Item = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <header className="navbar">
      <div className="inner">
        <Link to="/" className="brand">CinePick</Link>
        <nav className="desk">
          <Item to="/">Ana Sayfa</Item>
          <Item to="/all">Tümü</Item>
          <Item to="/favorites">Favoriler</Item>
          <Item to="/watchlist">İzleme Listem</Item>
        </nav>
        <button className="hamb" onClick={() => setOpen((v) => !v)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="backdrop"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              className="drawer"
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <Item to="/">Ana Sayfa</Item>
              <Item to="/all">Tümü</Item>
              <Item to="/favorites">Favoriler</Item>
              <Item to="/watchlist">İzleme Listem</Item>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
