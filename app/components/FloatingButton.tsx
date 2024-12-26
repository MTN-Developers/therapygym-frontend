// import Star from "@/assets/svgs/Star";
import React from "react";
import Draggable from "react-draggable";

const FloatingButton = () => {
  return (
    <Draggable>
      <div className="floating-button flex w-[298px] justify-center items-start gap-[13px] [background:#0078B7] shadow-[0px_4px_15px_0px_#082FB5] px-4 py-3 rounded-3xl bottom-[162px] text-white">
        <div>{/* <Star /> */}</div>
        <div>
          <p>Chat with </p>
          <p>Dr. Gennie</p>
        </div>
        {/* <button className="button-content"> Chat with Dr. Gennie</button> */}
      </div>
    </Draggable>
  );
};

export default FloatingButton;
