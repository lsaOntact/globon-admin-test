import { twMerge } from "tailwind-merge";

const STATUS_TAG_MAP = {
  normal: { label: "정상", color: "bg-green-50 text-white" },
  warning: { label: "주의", color: "bg-yellow-50 text-white" },
  danger: { label: "의심", color: "bg-red-50 text-white" },
};

const TextWordViewList = ({
  label,
  value,
  unit,
  status = "normal",
  valueClassName,
}) => {
  const statusTag = STATUS_TAG_MAP[status];

  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-[14px] font-medium text-[#A2A9B4]">{label}</span>
      <div className="flex items-center gap-2">
        <span
          className={twMerge(
            "text-[14px] whitespace-pre-wrap break-keep font-medium",
            status === "normal"
              ? "text-[#282828]"
              : statusTag.color.split(" ")[1],
            valueClassName
          )}
        >
          {value}
          {unit && <span className="ml-1 text-sm text-gray-400">{unit}</span>}
        </span>
        {unit && (
          <span className={`rounded px-2 py-[2px] text-sm ${statusTag.color}`}>
            {statusTag.label}
          </span>
        )}
      </div>
    </div>
  );
};

const Top3Item = ({ disease, rank, height, bgColor, textColor }) => (
  <div>
    <p
      className={twMerge(
        "font-semibold text-center mb-[12px] text-[14px]",
        textColor
      )}
    >
      {disease.diseaseName}
    </p>
    <div
      className={twMerge(
        "flex w-[80px] shrink-0 items-end justify-center rounded-t-[8px] pb-[6px]",
        bgColor
      )}
      style={{ height }}
    >
      <span
        className={twMerge("font-semibold text-center text-white text-[16px]")}
      >
        {rank}위
      </span>
    </div>
  </div>
);

const CustomBarChart = ({ cancerRankList }) => {
  const firstPlace = cancerRankList.find((cancer) => cancer.rank === 1);
  const secondPlace = cancerRankList.find((cancer) => cancer.rank === 2);
  const thirdPlace = cancerRankList.find((cancer) => cancer.rank === 3);
  const fourth = cancerRankList.find((cancer) => cancer.rank === 4);
  const fifth = cancerRankList.find((cancer) => cancer.rank === 5);

  return (
    <>
      <div className="flex items-end gap-[20px]">
        {/* 2위 */}
        <Top3Item
          disease={secondPlace}
          rank={2}
          height={86}
          bgColor="bg-[#DADEE4]"
          textColor="text-[#282828]"
        />
        {/* 1위 */}
        <Top3Item
          disease={firstPlace}
          rank={1}
          height={128}
          bgColor="bg-[#39B695]"
          textColor="text-[#39B695]"
        />
        {/* 3위 */}
        <Top3Item
          disease={thirdPlace}
          rank={3}
          height={52}
          bgColor="bg-[#DADEE4]"
          textColor="text-[#282828]"
        />
      </div>

      <div className="mt-[10px]">
        {/* 4위 */}
        <TextWordViewList
          label={"4위"}
          value={fourth?.diseaseName ?? "-"}
          valueClassName={"text-right"}
        />
        <div className="w-full border border-[#F2F3F5] my-[12px]"></div>
        {/*  5위 */}
        <TextWordViewList
          label={"5위"}
          value={fifth?.diseaseName ?? "-"}
          valueClassName={"text-right"}
        />
      </div>
    </>
  );
};

export default CustomBarChart;
