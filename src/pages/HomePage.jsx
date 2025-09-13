import Header from "../components/Header";
import Filters from "../components/Filters";
import MovieGrid from "../components/MovieGrid";
import AdSlot from "../components/AdSlot";
import GeneratorModal from "../components/GeneratorModal";
import CuratedRow from "../components/CuratedRow";
import useMovies from "../hooks/useMovies";
import Categories from '../components/Categories'
import { motion } from "framer-motion";

export default function HomePage() {
  const { movies, loading } = useMovies();

  return (
    <main>
      {/* Afiş / kahraman bölüm */}
      <Header />

      {/* Kategoriler */}
      <motion.section
        id="categories"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: 1200, margin: "12px auto 0", padding: "0 16px" }}
      >
        <Categories />
      </motion.section>

      {/* Filtreler */}
      <motion.section
        id="filters"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: .05 }}
        style={{ maxWidth: 1200, margin: "12px auto 0", padding: "0 16px" }}
      >
        <Filters />
      </motion.section>

      {/* Kürasyonlu satırlar */}
      <motion.section
        id="curations"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: .05 }}
      >
        <CuratedRow slug="underrated-gems" title="Gözden Kaçanlar" />
        <CuratedRow slug="sci-fi-lowkey" title="Low-key Sci-Fi" />
      </motion.section>

      {/* Ana keşif ızgarası */}
      <motion.section
        id="trending"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: 1200, margin: "20px auto 8px", padding: "0 16px" }}
      >
        <h2>Keşfet</h2>
      </motion.section>

      <MovieGrid items={movies} loading={loading} />

      <AdSlot id="home-bottom" />
      <GeneratorModal />
    </main>
  );
}
