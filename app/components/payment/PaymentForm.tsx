"use client";
// app/payment/page.js (or a component in this page)
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Image from "next/image";
import { Button, message } from "antd";
import * as yup from "yup";
import { paymentSchema } from "@/app/utils/validations";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
// import { api } from "@/services/api";
import ErrorMsg from "../shared/ErrorMsg";
import { StripeCardElement } from "@stripe/stripe-js";
import axiosInstance from "@/app/utils/axiosInstance";

const PaymentForm = ({ Package }: { Package: course_package }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const StripeNumber =
    Number(Package?.price_after_discount) == 0
      ? Number(Package?.original_price)
      : Number(Package?.price_after_discount);

  const calculatedGatewayFees = StripeNumber * 0.05;

  const FINAL_PRICE = StripeNumber + calculatedGatewayFees;

  const onSubmit = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: CreateIntent } = await axiosInstance.post("/transaction", {
        amount: FINAL_PRICE,
        item_id: Package.id,
        currency: "USD",
        type: "package",
      });

      // console.log(CreateIntent?.data, "CreateIntent");
      // console.log(CreateIntent?.data?.clientSecret);
      const { error } = await stripe.confirmCardPayment(
        CreateIntent?.data?.clientSecret,
        {
          payment_method: {
            card: cardElement as StripeCardElement,
          },
        }
      );

      // let status = '';
      if (error) {
        setLoading(false);
        setError("cardInfo", {
          type: "manual",
          message: error.message,
        });
      } else {
        setLoading(false);
        message.success("تم الدفع بنجاح");
        router.push(`/courses/${Package.course_id}`);
      }
    } catch (error) {
      console.log(error);
      message.error("حدث خطأ ما. لم يتم الدفع");
      setLoading(false);
    }
  };

  type FormData = yup.InferType<typeof paymentSchema>;

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(paymentSchema),
  });

  return (
    <form
      suppressHydrationWarning
      onSubmit={handleSubmit(onSubmit)}
      className="h-full w-full"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between mt-10 gap-x-[75px] gap-y-16">
        <div className="w-full  ">
          <h2 className="self-stretch mb-7 text-[#252525] [font-family:Inter] text-2xl font-semibold leading-[normal]">
            تفاصيل الدفع
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-[11px]">
                <Image
                  src={"/images/checkbox.svg"}
                  width={12}
                  height={12}
                  alt="Checkbox"
                />
                <p className="self-stretch text-[color:var(--Gray-700,#344054)] [font-family:Inter] text-[10.895px] font-medium leading-[15.564px]">
                  Pay with Credit Card
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/images/payment_method (1).svg"}
                  width={35}
                  height={24}
                  alt="Payment Method"
                />
                <Image
                  src={"/images/payment_method (2).svg"}
                  width={35}
                  height={24}
                  alt="Payment Method"
                />
                <Image
                  src={"/images/payment_method (3).svg"}
                  width={35}
                  height={24}
                  alt="Payment Method"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Controller
                name="cardInfo"
                control={control}
                render={({ field: { onChange } }) => (
                  <CardElement
                    onChange={(e) => {
                      if (e.complete) {
                        onChange("completed");
                      } else {
                        onChange("");
                      }
                    }}
                    options={{
                      style: {
                        base: {
                          fontSize: "14px",
                          backgroundColor: "#FFF",
                          color: "#424770",
                          "::placeholder": {
                            color: "#696969",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                    className="p-4 border rounded-lg shadow"
                  />
                )}
              />
              <ErrorMsg message={errors.cardInfo?.message as string} />
            </div>

            <Button
              className="!bg-primary mt-4 !font-['Cairo'] flex w-full !h-[48px] !text-lg !font-semibold leading-[normal] justify-center items-center gap-1 [background:#004D9E] !px-[5px]  !rounded-lg"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? "جاري الدفع ..." : "ادفع الآن"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
