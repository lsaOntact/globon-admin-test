import { Space, Typography } from "antd";
import BottomSheet from "./BottomSheet";
import { useState } from "react";

const ModalPage = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  return (
    <Space size={"large"} align="start">
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
            setShowModal={setOpenBottomSheet}
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
    </Space>
  );
};

export default ModalPage;
