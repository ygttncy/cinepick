import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AllMovies from "./pages/AllMovies";
import GenrePage from "./pages/GenrePage";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: 3,
        width: "100%",
        scaleX,
        transformOrigin: "left center",
        zIndex: 50,
        background: "linear-gradient(90deg, #7c3aed, #22d3ee)",
      }}
    />
  );
}

function PageContainer({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function RouterBody() {
  const location = useLocation();

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <PageContainer key={location.pathname}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/all" element={<AllMovies />} />
            <Route path="/genre/:slug" element={<GenrePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageContainer>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouterBody />
    </BrowserRouter>
  );
}
