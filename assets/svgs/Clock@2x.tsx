import React from "react";

const Clock = ({ color }: { color: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 21.5C17.4706 21.5 21.5 17.4706 21.5 12.5C21.5 7.52944 17.4706 3.5 12.5 3.5C7.52944 3.5 3.5 7.52944 3.5 12.5C3.5 17.4706 7.52944 21.5 12.5 21.5Z"
        stroke={color || "#007AFE"}
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <path
        d="M12.5 7.25V12.5H17.75"
        stroke={color || "#007AFE"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Clock;
