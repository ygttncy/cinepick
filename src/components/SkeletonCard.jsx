import { motion } from "framer-motion";
import "./SkeletonCard.scss";
export default function SkeletonCard() {
  return (
    <div className="skeleton">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.08), rgba(255,255,255,0))",
        }}
      />
    </div>
  );
}
