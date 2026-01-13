import { twMerge } from "tailwind-merge";

export const LeftArrow = ({ fillColor = "#8F8F8F" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <path
      d="M5.3 9.58407C4.23333 8.88004 4.23333 7.11996 5.3 6.415933L10.1 3.24778C11.1667 2.54375 12.5 3.42379 12.5 4.83186V11.1681C12.5 12.5762 11.1667 13.4562 10.1 12.7522L5.3 9.58407Z"
      fill={fillColor}
    />
  </svg>
);

export const RightArrow = ({ fillColor = "#8F8F8F" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <path
      d="M11.7 9.58407C12.7667 8.88004 12.7667 7.11996 11.7 6.415933L6.9 3.24778C5.83333 2.54375 4.5 3.42379 4.5 4.83186V11.1681C4.5 12.5762 5.83333 13.4562 6.9 12.7522L11.7 9.58407Z"
      fill={fillColor}
    />
  </svg>
);

export const CheckMark = ({ fillColor = "#fff" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      fill={fillColor}
    />
  </svg>
);

export const CloseIcon = ({ fillColor = "#000000", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseButton = ({ onClick, iconColor = "#000000", className }) => (
  <button
    onClick={onClick}
    className={twMerge("flex  items-center justify-center ", className)}
  >
    <CloseIcon fillColor={iconColor} size={24} />
  </button>
);
