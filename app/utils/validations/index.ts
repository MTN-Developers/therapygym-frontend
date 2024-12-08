export { loginValidationSchema } from './login-validation-schema';
export { signUpValidationSchema } from './signup-validation-schema';

import * as yup from 'yup';
export const paymentIntentSchema = yup.object({
  amount: yup.number().required(),
});

export const userSchema = yup.object({
  name: yup.string().required('برجاء ادخال الاسم'),
  password: yup
    .string()
    .required('برجاء ادخال كلمه المرور')
    .min(6, 'كلمه المرور يجب ان تكون اكثر من 6 احرف')
    .max(20, 'كلمه المرور يجب ان تكون اقل من 20 حرف')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#]/,
      'كلمه المرور يجب ان تحتوي علي حرف كبير وحرف صغير ورقم ورموز خاصه',
    ),
  email: yup.string().email('برجاء ادخال البريد الالكتروني بشكل صحيح').required('برجاء ادخال البريد الالكتروني'),
  country: yup.string().required('برجاء اختيار الدولة'),
  countryCode: yup.string().required('برجاء ادخال كود الدوله'),
  phone: yup.string().required('برجاء ادخال رقم الهاتف'),
  // cardInfo: yup.string().required("برجاء ادخال بيانات البطاقه"),
});

export const promoCodesSchema = yup.object({
  promoCode: yup.string().required('Promo Code is required'),
});
export const paymentSchema = yup.object({
  cardInfo: yup.string().required('برجاء ادخال بيانات البطاقه'),
});
