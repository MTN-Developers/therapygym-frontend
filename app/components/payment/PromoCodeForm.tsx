import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMsg from "../shared/ErrorMsg";
import axios from "axios";
import { endpoints } from "@/services/endpoints";
type PromoCodeFormData = yup.InferType<typeof promoCodesSchema>;
const promoCodesSchema = yup.object({
  promoCode: yup.string().required("Promo Code is required"),
});

const PromoCodeForm = ({
  setTotal,
  promoCodeList,
  setPromoCodeList,
  setGatewayFees,
  clientPhone,
  total,
  gatewayFees,
}: {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  promoCodeList: any;
  setPromoCodeList: any;
  setGatewayFees: any;
  total: number;
  clientPhone: string;
  gatewayFees: number;
}) => {
  const InputClassNames = `!border-[#E7E9EB] !p-0 h-[49px] !px-4 placeholder:!text-[#696969] placeholder:![font-family:Inter] placeholder:!text-sm placeholder:!font-normal placeholder:!leading-[normal]`;
  const {
    handleSubmit: handleSubmit,
    control: controlPromo,
    formState: { errors: promoErrors },
  } = useForm<PromoCodeFormData>({
    resolver: yupResolver(promoCodesSchema),
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: PromoCodeFormData) => {
    const { promoCode } = data;
    // ntPhoneConcat = ""

    if (promoCodeList.find((promo: any) => promo.code === promoCode))
      return message.error("Promo code already added");

    if (promoCodeList.length > 0)
      return message.error("Only one promo code can be applied at a time");

    // const clientPhone = clientPhoneConcat.replace("+", "");

    setLoading(true);

    try {
      const { data, status } = await axios.post(endpoints.checkPromoCode, {
        code: promoCode,
        phone_number: clientPhone,
      });
      //
      // console.log(data?.data);
      if (status === 200) {
        setPromoCodeList((prev: any) => [...prev, data?.data]);

        const originalTotal = total - gatewayFees;
        const discountAmount =
          (originalTotal * data?.data?.discount_percentage) / 100;
        const newTotal = originalTotal - discountAmount;
        const newGatewayFees = newTotal * 0.05;

        setTotal(newTotal + newGatewayFees); // Add gateway fees to the total
        setGatewayFees(newGatewayFees);
        message.success("Promo code added successfully");
      }
    } catch (e: any) {
      if (e?.response?.data?.error && e?.response?.data?.error?.length) {
        e?.response?.data?.error?.map((el: any) => {
          message.error(`${el?.msg} ${el?.value}`);
        });
      } else {
        message.error(e?.response?.data?.message);
      }
      // ;
      // console.log();
    }
    setLoading(false);
  };

  // console.log(promoCodeList);
  return (
    <>
      <div
        dir="ltr"
        suppressHydrationWarning
        id="promo-code"
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <div className="flex flex-col w-full">
          <Controller
            name="promoCode"
            control={controlPromo}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Offers"
                className={`${InputClassNames} placeholder:!text-base  w-full`}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button
          className="!absolute right-[10px] top-1/2 !bg-primary flex w-[98px] justify-center items-center gap-1 [background:#004D9E] !px-[5px] !py-2 !rounded-lg"
          style={{ transform: "translateY(-50%" }}
          type="primary"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "Checking" : "Add Code"}
        </Button>
      </div>
      <ErrorMsg message={promoErrors.promoCode?.message as string} />
    </>
  );
};

export default PromoCodeForm;
