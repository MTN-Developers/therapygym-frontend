export const endpoints = {
  login: "/auth/login",
  checkPromoCode: ({ phone, code }: { phone: string; code: string }) =>
    `/promo-code/check?phoneNumber=${phone}&code=${code}`,
};
