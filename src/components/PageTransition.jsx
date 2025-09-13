import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 8, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.995 },
};

export default function PageTransition({ children }) {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
