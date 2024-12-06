import Image from "next/image";
import React from "react";
import clockIcon from "@/assets/images/Clock@2x.svg";
import dollarIcon from "@/assets/images/CurrencyDollarSimple.svg";
import cupIcon from "@/assets/images/Trophy.svg";
import tvIcon from "@/assets/images/tv.png";
import alertIcon from "@/assets/images/Alarm.svg";
import { Button, Modal } from "antd";

const RightSideCourseComp = ({ course }: { course: SubscribedCourse }) => {
  const [open_packages_modal, setOpenPackagesModal] = React.useState(false);

  const handlePurchaseButton = () => {
    switch (course.type) {
      case "standalone":
        console.log("standalone");
        break;
      case "standalone_subscribe":
        console.log("standalone_subscribe");
        break;
      case "subscribe":
        console.log("subscribe");
        setOpenPackagesModal(true);
        break;
    }
  };
  return (
    <div className="lg:w-[370px] lg:h-fit pb-6 bg-white rounded-xl shadow-lg z-50">
      {open_packages_modal ? (
        <Modal
          title="Basic Modal"
          style={{
            background: "transparent",
          }}
          open={open_packages_modal}
          onOk={() => setOpenPackagesModal(false)}
          onCancel={() => setOpenPackagesModal(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      ) : null}
      <div className="relative ">
        <Image
          src={course.banner_ar}
          alt="course image"
          width={370}
          height={740}
          style={{
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
          className="w-full lg:h-[245px] mb-[12px] object-cover"
        />
        {/* <Image
          src={playIcon}
          alt="play icon"
          width={70}
          height={70}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-full cursor-pointer hover:shadow-2xl "
        /> */}
      </div>
      <div className="w-full px-3 font-[pnu] ">
        <p className="font-bold mb-[12px]">هذا الكورس يحتوي علي :</p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={clockIcon} alt="clock icon" width={20} height={20} />
          </span>{" "}
          الوصول مدى الحياة
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={dollarIcon} alt="clock icon" width={20} height={20} />
          </span>{" "}
          ضمان استعادة الأموال لمدة 30 يومًا{" "}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={cupIcon} alt="clock icon" width={20} height={20} />
          </span>{" "}
          شهادة إتمام قابلة للمشاركة{" "}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={tvIcon} alt="clock icon" width={20} height={20} />
          </span>{" "}
          المشاهدة على الهاتف المحمول والكمبيوتر والتلفزيون{" "}
        </p>

        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[#8C94A3] [font-family:Inter] text-base font-normal leading-6 line-through mx-2">
              ${course.original_price}
            </span>
            <span className="w-[65px] shrink-0 [font-family:Inter] text-[color:var(--Gray-900,#1D2026)] text-right  text-2xl font-bold leading-8">
              ${course.price_after_discount}
            </span>
          </div>
          <div>
            <button className="flex justify-center items-end [font-family:Inter]  rounded bg-[#e9eef4] px-3 py-2 text-red-400 text-xl">
              <span className="text-[15px] font-bold mx-2">OFF</span>
              <span>
                {((course.original_price - course.price_after_discount) /
                  course.original_price) *
                  100}
                %
              </span>
            </button>
          </div>
        </div>
        <p className="flex items-center gap-2 font-bold text-[#e34444] mb-[12px] text-sm">
          <span>
            <Image src={alertIcon} alt="clock icon" width={20} height={20} />
          </span>{" "}
          باقي يومين على هذا العرض{" "}
        </p>
        <Button
          variant="solid"
          color="primary"
          className=" w-full flex !h-[56px] justify-center text-xl items-center text-white  bg-[#017AFD] px-8 rounded-lg mb-3"
          onClick={handlePurchaseButton}
        >
          اشترك الان
        </Button>
        {/* <button className=" w-full flex  mb-3 justify-center text-xl items-center text-[#164194]  bg-[#e9eef4] px-8 py-4 rounded-lg">
          لطلب التقسيط
        </button> */}
        <p>
          <span className="text-red-400 text-xs">ملاحظة :</span> تتمتع جميع
          الدورات بضمان استعادة الأموال لمدة 30 يومًا
        </p>
      </div>
    </div>
  );
};

export default RightSideCourseComp;
