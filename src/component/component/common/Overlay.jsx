import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";

const Overlay = ({
  show,
  onClick,
  isBackdropClickable = true,
  delay = 0,
  className,
  children,
}) => {
  // 모달 열릴때 외부 스크롤 방지
  useEffect(() => {
    if (show) {
      const originalBodyStyle = document.body.style.overflow;
      const originalHtmlStyle = document.documentElement.style.overflow;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
        document.documentElement.style.overflow = originalHtmlStyle;
        document.body.style.overflow = originalBodyStyle;
      };
    }
  }, [show]);

  const onCloseModal = () => {
    if (!isBackdropClickable) return;
    if (onClick) onClick();
  };
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
          onClick={onCloseModal}
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
