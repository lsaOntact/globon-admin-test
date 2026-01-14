import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Overlay = ({ show, onClick, delay = 0, className, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="overlay-backdrop"
          className={twMerge(
            "no-scrollbar absolute bottom-0 left-0 right-0 top-0 bg-[rgba(0,0,0,0.5)] z-0",
            className
          )}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3, delay, ease: "easeInOut" }}
          onClick={onClick}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
