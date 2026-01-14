import { useEffect } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { CloseButton } from "../common/common";
import Overlay from "../common/Overlay";

const BottomSheet = ({
  showModal,
  setShowModal,
  isBackdropClickable = true,
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
    <Overlay show={showModal} onClick={onCloseModal}>
      <motion.div
        key="bottom-sheet"
        variants={modalVariants}
        initial="initial"
        animate="show"
        exit="hide"
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          "absolute z-10 bottom-0 left-0 right-0 top-auto mx-auto flex w-full flex-col rounded-t-[20px] bg-white max-h-[calc(100vh-10vh)]",
          !showHeader && "pt-10",
          className
        )}
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
    </Overlay>
  );
};

export default BottomSheet;

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
