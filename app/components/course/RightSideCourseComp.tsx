import Image from "next/image";
import React from "react";
import clockIcon from "@/assets/images/Clock@2x.svg";
import dollarIcon from "@/assets/images/CurrencyDollarSimple.svg";
import cupIcon from "@/assets/images/Trophy.svg";
import tvIcon from "@/assets/images/tv.png";
import alertIcon from "@/assets/images/Alarm.svg";
import { Button, Modal } from "antd";
import Close from "@/assets/components/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RightSideCourseComp = ({ course }: { course: SubscribedCourse }) => {
  const [open_packages_modal, setOpenPackagesModal] = React.useState(false);
  const router = useRouter();

  const handlePurchaseButton = () => {
    switch (course.type) {
      case "standalone":
        router.push(`/courses/${course.id}/payment`);
        break;
      case "standalone_subscribe":
        // Navigate to an options page or show a modal
        router.push(`/courses/${course.id}/purchase-options`);
        break;
      case "subscribe":
        setOpenPackagesModal(true);
        break;
      default:
        console.error("Unknown course type");
        break;
    }
  };
  return (
    <div className="lg:w-[370px] lg:h-fit pb-6 bg-white rounded-xl shadow-lg z-50">
      {open_packages_modal ? (
        <Modal
          closeIcon={<Close />}
          title=""
          className="packages-modal top-[50px]"
          rootClassName="packages-modal2"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          width={1100}
          style={{
            background: "transparent",
          }}
          open={open_packages_modal}
          onOk={() => setOpenPackagesModal(false)}
          onCancel={() => setOpenPackagesModal(false)}
        >
          <div className="[font-family:Cairo] mt-4 flex flex-col w-full justify-center items-center">
            <h2 className="text-white text-[62px] font-medium leading-[66px] mb-2">
              أختر الباقة المناسبة لك
            </h2>
            <p className="w-[415px] shrink-0 text-[#C0C0C0] text-center text-lg font-bold leading-[66px]">
              خيارات ميسورة التكلفة وقابلة للتطوير للجميع.
            </p>

            <div className="w-full">
              <Swiper
                spaceBetween={16}
                slidesPerView={"auto"}
                className="w-full h-fit"
              >
                {[
                  ...course.packages,
                  ...course.packages,
                  ...course.packages,
                  ...course.packages,
                  ...course.packages,
                ]?.map((pkg, idx) => (
                  <SwiperSlide key={idx} className="!w-[306px] !lg:w-[415px] ">
                    <PackageCard course_id={course.id} key={idx} pkg={pkg} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
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

const PackageCard = ({
  pkg,
  course_id,
}: {
  pkg: course_package;
  course_id: string;
}) => {
  let duration = "";
  switch (pkg.duration) {
    case 1:
      duration = "كل شهر";
      break;
    case 3:
      duration = "كل 3 شهور";
      break;
    case 6:
      duration = "كل 6 شهور";
      break;
    case 12:
      duration = "سنويا";
      break;
  }

  return (
    <div className="w-[306px] lg:w-[415px] max-w-full bg-white rounded-xl shadow-lg p-6 text-right border border-blue-200">
      {/* Header */}
      <div className="bg-blue-100 text-blue-700 rounded-full inline-block px-4 py-1 text-sm font-medium mb-4">
        باقة شهرية
      </div>

      {/* Price */}
      <h1 className="text-blue-800 text-4xl font-bold mb-4">
        ${pkg.price_after_discount}
        <span className="text-lg font-normal">/{duration}</span>
      </h1>

      {/* Subscription Content */}
      <div className="text-gray-700 text-right mb-6">
        <h2 className="text-xl font-bold mb-2">محتوى الاشتراك</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>
            احصل على ٤ حلقات مسجلة
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>٣
            لقاءات جماعية مباشرة مع الدكتور
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>
            مدة اللقاء مع الدكتور من ساعة إلى ساعة ونصف
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>
            استمتع بالتواجد في مجتمع داعم ومؤثر وبيئة ملهمة
          </li>
        </ul>
      </div>

      {/* Subscribe Button */}
      <Link href={`/courses/${course_id}/payment/${pkg.id}`}>
        <Button className="bg-blue-700 text-white font-bold !py-3 !px-6 !h-[54px] font-[Cairo] rounded-lg w-full hover:bg-blue-800 transition">
          اشترك الآن
        </Button>
      </Link>
    </div>
  );
};
