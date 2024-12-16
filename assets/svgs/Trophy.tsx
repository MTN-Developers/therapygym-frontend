import React from "react";

const Trophy = ({ color }: { color: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.25 5.75V10.9153C19.25 14.6372 16.273 17.7222 12.5512 17.7498C11.6605 17.7566 10.7772 17.587 9.95239 17.2508C9.12754 16.9146 8.37738 16.4185 7.74516 15.791C7.11294 15.1636 6.61115 14.4172 6.26872 13.5949C5.9263 12.7727 5.75 11.8907 5.75 11V5.75C5.75 5.55109 5.82902 5.36032 5.96967 5.21967C6.11032 5.07902 6.30109 5 6.5 5H18.5C18.6989 5 18.8897 5.07902 19.0303 5.21967C19.171 5.36032 19.25 5.55109 19.25 5.75Z"
        stroke={color || "#007AFE"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5 21.5H9.5"
        stroke={color || "#007AFE"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 17.75V21.5"
        stroke={color || "#007AFE"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.91724 12.5H4.99995C4.2043 12.5 3.44124 12.1839 2.87863 11.6213C2.31602 11.0587 1.99995 10.2956 1.99995 9.5V8C1.99995 7.80109 2.07897 7.61032 2.21962 7.46967C2.36027 7.32902 2.55104 7.25 2.74995 7.25H5.74995"
        stroke={color || "#007AFE"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.0658 12.5H20.0118C20.8075 12.5 21.5706 12.1839 22.1332 11.6213C22.6958 11.0587 23.0118 10.2956 23.0118 9.5V8C23.0118 7.80109 22.9328 7.61032 22.7922 7.46967C22.6515 7.32902 22.4608 7.25 22.2618 7.25H19.2618"
        stroke={color || "#007AFE"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Trophy;
