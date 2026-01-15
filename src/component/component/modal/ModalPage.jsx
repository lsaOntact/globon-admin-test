import { Space, Typography } from "antd";
import BottomSheet from "./BottomSheet";
import { useState } from "react";
import Overlay from "../common/Overlay";
import Popup from "./Popup";

const ModalPage = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Space size={"large"} align="start">
      <section>
        <Typography.Title level={5}>Modal Overlay</Typography.Title>
        <div className="w-[430px] h-[732px] relative flex justify-center items-center">
          <button
            className="p-3 bg-slate-200"
            onClick={() => setOpenOverlay(true)}
          >
            오버레이 열기
          </button>
          <Overlay
            show={openOverlay}
            onClick={() => setOpenOverlay(false)}
            delay={0}
          />
        </div>
      </section>

      <section>
        <Typography.Title level={5}>
          Bottom Sheet (framer-motion)
        </Typography.Title>
        <div className="w-[430px] h-[732px] relative flex justify-center items-center">
          <button
            className="p-3 bg-slate-200"
            onClick={() => setOpenBottomSheet(true)}
          >
            바텀시트 열기
          </button>
          <BottomSheet
            showModal={openBottomSheet}
            onClose={() => setOpenBottomSheet(false)}
            isShowCloseButton
            showHeader
            headerTitle={"복용 관리"}
          >
            <div className="px-[20px]">
              <div className="my-[24px] bg-[#F2F3F5] p-[20px] rounded-[10px] flex justify-between items-center">
                샘플
              </div>
              <div className="grid grid-cols-2 gap-[12px]">
                <div className="rounded-[10px] px-[20px] py-[25px] border border-[#e2e6ed]">
                  샘플1
                </div>
                <div className="rounded-[10px] px-[20px] py-[25px] border border-[#e2e6ed]">
                  샘플2
                </div>
              </div>
            </div>
          </BottomSheet>
        </div>
      </section>

      <section>
        <Typography.Title level={5}>Popup</Typography.Title>
        <div className="w-[430px] h-[732px] relative flex justify-center items-center">
          <button
            className="p-3 bg-slate-200"
            onClick={() => setOpenPopup(true)}
          >
            팝업 열기
          </button>
          <Popup
            showModal={openPopup}
            onClose={() => setOpenPopup(false)}
            headTitle={"오늘 기록된 몸무게가 있습니다."}
            subTitle={"이전 기록을 유지할까요?"}
            buttonOption={{
              type: "multi",
              confirmText: "유지하기",
              cancelText: "삭제하기",
            }}
          />
        </div>
      </section>
    </Space>
  );
};

export default ModalPage;
