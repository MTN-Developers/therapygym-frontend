import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMsg from "../shared/ErrorMsg";
import { endpoints } from "@/services/endpoints";
import axiosInstance from "@/app/utils/axiosInstance";
type PromoCodeFormData = yup.InferType<typeof promoCodesSchema>;
const promoCodesSchema = yup.object({
  promoCode: yup.string().required("Promo Code is required"),
});

interface PromoCode {
  code: string;
  discount_percentage: number;
}

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
    setError,
    formState: { errors: promoErrors },
  } = useForm<PromoCodeFormData>({
    resolver: yupResolver(promoCodesSchema),
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: PromoCodeFormData) => {
    const { promoCode } = data;

    // Check for existing promo code
    if (
      promoCodeList.some(
        (promo: PromoCode) =>
          promo.code.toLowerCase() === promoCode.toLowerCase()
      )
    ) {
      setError("promoCode", {
        type: "manual",
        message: "This promo code has already been applied",
      });
      return;
    }

    // Check for multiple promo codes
    if (promoCodeList.length > 0) {
      setError("promoCode", {
        type: "manual",
        message: "Only one promo code can be applied at a time",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.get(
        endpoints.checkPromoCode({
          code: promoCode,
          phone: clientPhone,
        })
      );

      if (status === 200) {
        const promoData = {
          code: promoCode,
          discount_percentage: response?.data?.discount_percentage,
        };

        setPromoCodeList([promoData]);

        // Calculate discount and new total
        const originalTotal = total - gatewayFees;
        const discountAmount =
          (originalTotal * promoData.discount_percentage) / 100;
        const discountedTotal = originalTotal - discountAmount;
        const newGatewayFees = Math.round(discountedTotal * 0.05 * 100) / 100;
        const finalTotal =
          Math.round((discountedTotal + newGatewayFees) * 100) / 100;

        setGatewayFees(newGatewayFees);
        setTotal(finalTotal);

        message.success("Promo code applied successfully");
      }
    } catch (error: any) {
      setError("promoCode", {
        type: "manual",
        message: error?.response?.data?.message || "Invalid promo code",
      });
    } finally {
      setLoading(false);
    }
  };

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
                placeholder="Promo Code"
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
