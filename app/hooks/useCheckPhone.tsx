import axios, { AxiosError } from "axios";

export const useCheckPhone = () => {
  let check_phone_is_valid = "";
  let check_phone_status = "";

  const handleCheckPhoneNumber = async ({
    phoneNumber,
  }: {
    phoneNumber: string;
  }) => {
    const apiKey = process.env.NEXT_PUBLIC_CHECK_PHONE_API_KEY;
    try {
      const { data, status } = await axios.get(
        `https://api.api-ninjas.com/v1/validatephone?number=${phoneNumber}`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      check_phone_is_valid = data.is_valid;
      check_phone_status = String(status);
    } catch (e) {
      console.log(e, "Error");
    }

    const data = {
      phone: phoneNumber,
    };

    let isMessageSent;

    try {
      const sendWhatsapp = await axios.post(
        "https://managethenow.com/api/api/whatsapp/" as string,
        data
      );

      if (sendWhatsapp.status == 200) {
        if (sendWhatsapp.data.message == "not_exists") {
          isMessageSent = false;
        } else {
          isMessageSent = true;
        }
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err!.response!.status == 400) {
          isMessageSent = false;
        }
      }
    }

    return {
      isPhoneValid: check_phone_is_valid,
      status: check_phone_status,
      isMsgSent: isMessageSent,
    };
  };

  return { handleCheckPhoneNumber };
};
