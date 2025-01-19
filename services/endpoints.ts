export const endpoints = {
  login: "/auth/login",
  checkPromoCode: ({ code, course_id }: { code: string; course_id }) =>
    `/promo-code/check?code=${code}&courseId=${course_id}`,
  searchEndpoint: (searchTerm: string) => `/course?search=${searchTerm}`,
};
