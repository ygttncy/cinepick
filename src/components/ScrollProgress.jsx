import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    controls.start({ scaleX: progress || 0 });
  }, [progress, controls]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: 3,
        width: "100%",
        transformOrigin: "0 0",
        background:
          "linear-gradient(90deg, rgba(180,110,255,.9), rgba(90,180,255,.9))",
        zIndex: 60,
        scaleX: 0,
      }}
      initial={{ scaleX: 0 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    />
  );
}
