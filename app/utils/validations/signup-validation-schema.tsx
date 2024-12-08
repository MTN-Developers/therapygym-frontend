import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Full Name is required').min(3, 'Name is too short'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  country_code: Yup.string().required('Country code is required'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Please enter numbers only'),
});
