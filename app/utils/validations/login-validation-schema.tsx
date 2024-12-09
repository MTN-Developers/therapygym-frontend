import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('بريد الكتروني غير صحيح').required('البريد الالكتروني مطلوب'),
  password: Yup.string().min(6, 'كلمه المرور يجب ان تكون 6 احرف على الاقل').required('كلمه المرور مطلوبه'),
});

export const sendLinkValidationSchema = Yup.object().shape({
  email: Yup.string().email('بريد الكتروني غير صحيح').required('البريد الالكتروني مطلوب'),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string().min(6, 'كلمه المرور يجب ان تكون 6 احرف على الاقل').required('كلمه المرور مطلوبه'),
});
