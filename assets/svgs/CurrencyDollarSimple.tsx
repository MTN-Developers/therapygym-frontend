import React from "react";

const CurrencyDollarSimple = ({ color }: { color: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 2.75V5"
        stroke={color || "#017AFD"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 20V22.25"
        stroke={color || "#017AFD"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.75 8.75C17.75 8.25754 17.653 7.76991 17.4645 7.31494C17.2761 6.85997 16.9999 6.44657 16.6517 6.09835C16.3034 5.75013 15.89 5.47391 15.4351 5.28545C14.9801 5.097 14.4925 5 14 5H10.625C9.63044 5 8.67661 5.39509 7.97335 6.09835C7.27009 6.80161 6.875 7.75544 6.875 8.75C6.875 9.74456 7.27009 10.6984 7.97335 11.4017C8.67661 12.1049 9.63044 12.5 10.625 12.5H14.75C15.7446 12.5 16.6984 12.8951 17.4017 13.5983C18.1049 14.3016 18.5 15.2554 18.5 16.25C18.5 17.2446 18.1049 18.1984 17.4017 18.9017C16.6984 19.6049 15.7446 20 14.75 20H10.25C9.25544 20 8.30161 19.6049 7.59835 18.9017C6.89509 18.1984 6.5 17.2446 6.5 16.25"
        stroke={color || "#017AFD"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CurrencyDollarSimple;
