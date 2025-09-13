import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { generateBy } from "../services/api.js";
import "./GeneratorModal.scss";

export default function GeneratorModal() {
  const dialogRef = useRef(null);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onHash() {
      const willOpen = location.hash === "#generator";
      setOpen(willOpen);
      if (willOpen) dialogRef.current?.showModal();
      else dialogRef.current?.close();
    }
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const run = async () => {
    const res = await generateBy({ genre, year });
    setItems(res);
  };

  return (
    <dialog ref={dialogRef} className="generator" id="generator">
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <h3>Tür & Yıla Göre Rastgele Öner</h3>
            <div className="row">
              <input placeholder="Tür (ör. drama)" value={genre} onChange={e => setGenre(e.target.value)} />
              <input placeholder="Yıl (ör. 2016)" value={year} onChange={e => setYear(e.target.value)} />
              <button className="btn primary" onClick={run}>Getir</button>
              <button className="btn" onClick={() => (location.hash = "")}>Kapat</button>
            </div>

            <div className="list">
              {items.map((m) => (
                <motion.a
                  key={m.id}
                  href={`/movie/${m.id}`}
                  className="item"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <img src={m.poster} alt={m.title} />
                  <div>
                    <div className="title">{m.title}</div>
                    <div className="meta">{m.year} • ⭐ {m.rating}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
