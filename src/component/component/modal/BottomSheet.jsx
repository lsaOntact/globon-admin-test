import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { CloseButton } from "../common/common";

const BottomSheet = ({
  showModal,
  setShowModal,
  isBackdropClickable = true,
  delay = 0,
  children,
  showHeader,
  headerTitle,
  onClose,
  className,
  contentClassName,
}) => {
  // 모달 열릴때 외부 스크롤 방지
  useEffect(() => {
    if (showModal) {
      const originalBodyStyle = document.body.style.overflow;
      const originalHtmlStyle = document.documentElement.style.overflow;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
        document.documentElement.style.overflow = originalHtmlStyle;
        document.body.style.overflow = originalBodyStyle;
      };
    }
  }, [showModal]);

  const onCloseModal = () => {
    if (!isBackdropClickable) return;
    setShowModal(false);
    if (onClose) onClose();
  };
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          key={"bottom-sheet-backdrop"}
          className={
            "no-scrollbar absolute bottom-0 left-0 right-0 top-0 z-[70] bg-[rgba(0,0,0,0.5)]"
          }
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ delay: delay }}
          onClick={onCloseModal}
        >
          <motion.div
            key="bottom-sheet"
            variants={modalVariants}
            initial="initial"
            animate="show"
            exit="hide"
            onClick={(e) => e.stopPropagation()}
            className={twMerge(
              "absolute bottom-0 left-0 right-0 top-auto z-[10] mx-auto flex w-full flex-col rounded-t-[12px] bg-white",
              !showHeader && "pt-10",
              className
            )}
            style={{ maxHeight: "calc(100% - 10%)" }}
          >
            {/* 헤더 영역 */}
            {showHeader && (
              <div className="mt-[30px] px-[20px] flex justify-between items-center">
                <h3 className="font-bold text-lg text-center flex-1">
                  {headerTitle}
                </h3>
                <CloseButton onClick={onCloseModal} />
              </div>
            )}

            {/* 스크롤 가능한 컨텐츠 영역 - flex-1로 남은 공간 채우기 */}
            <div
              className={twMerge(
                "flex-1 overflow-auto px-5 pb-[20px] scrollbar-hide",
                contentClassName
              )}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  initial: {
    y: "100vh",
    opacity: 0,
  },
  show: {
    opacity: 1,
    y: "0px",
    transition: {
      delay: 0.05,
      type: "spring",
      damping: 60,
      stiffness: 500,
    },
  },
  hide: {
    opacity: 0,
    y: "100vh",
    transition: {
      type: "easeIn",
    },
  },
};
