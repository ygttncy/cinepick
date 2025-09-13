import React from "react";
import { motion } from "framer-motion";

export default function Reveal({ delay = 0, children, as: Tag = "div" }) {
  return (
    <motion.div
      as={Tag}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </motion.div>
  );
}
