import { motion } from "framer-motion";

export const Loader = () => {
      return <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-transparent border-t-foreground border-r-foreground rounded-full" />;
};
