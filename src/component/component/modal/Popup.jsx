import React from "react";
import Overlay from "../common/Overlay";
import { motion } from "framer-motion";

const Popup = ({
  showModal,
  setShowModal,
  isBackdropClickable = true,
  headTitle,
  subTitle,
  children,
  onClose,
  buttonOption = {
    type: "single",
    confirmText: "확인",
    cancelText: "취소",
  },
  contentClassName,
}) => {
  return (
    <Overlay show={showModal} onClick={onClose}>
      <div className="flex justify-center items-center w-full h-[100%] px-[20px]">
        <motion.div
          key={"popup-message"}
          variants={popupVariants}
          initial="initial"
          animate="show"
          exit="hide"
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-white rounded-[20px] px-[20px] py-[30px]"
        >
          {headTitle && (
            <p className="font-bold text-[18px] text-center text-[#282828]">
              {headTitle}
            </p>
          )}
          {subTitle && (
            <p className="mt-[18px] text-[15px] text-[#767C88] text-center">
              {subTitle}
            </p>
          )}
          {children}
          {buttonOption.type == "single" && (
            <button className="mt-[18px] py-[14px] flex justify-center items-center rounded-[12px] cursor-pointer bg-[#F2F3F5] text-[#282828] w-full">
              <span className="text-[16px] text-[#282828] font-semibold">
                {buttonOption.confirmText}
              </span>
            </button>
          )}
          {buttonOption.type == "multi" && (
            <div className="grid grid-cols-2 gap-[8px] mt-[18px]">
              <button className="py-[14px] flex justify-center items-center rounded-[12px] cursor-pointer bg-white border border-[#e2e6ed]">
                <span className="text-[16px] font-semibold text-[#767C88]">
                  {buttonOption.cancelText}
                </span>
              </button>
              <button className="py-[14px] flex justify-center items-center rounded-[12px] cursor-pointer bg-[#39B695] border border-[#39B695]">
                <span className="text-[16px] font-bold text-white">
                  {buttonOption.confirmText}
                </span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </Overlay>
  );
};

export default Popup;
const popupVariants = {
  initial: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 0.05,
      type: "spring",
      damping: 60,
      stiffness: 500,
    },
  },
  hide: {
    opacity: 0,
    transition: {
      type: "easeIn",
    },
  },
};
