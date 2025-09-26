/**** interfaces for the Login form ****/

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  member_id: string;
  picture_path: string;
  access_token: string;
  title: string;
  current_status: string;
}

/**** interfaces for the SignIn form */

export interface SignUpFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  month: string;
  day: string;
  year: string;
  profile_type: string;
  terms_accepted: boolean;
}

/****  interfaces for the Forgot password form ****/
export interface ForgotPasswordFormInputs {
  email: string;
}

/****  interfaces for the Forgot password form ****/
export interface ResetPasswordFormInputs {
  code: string;
}

/****  interfaces for the Change password form ****/
export interface ChangePasswordFormInputs {
  password: string;
  confirmPassword: string;
}

export interface User {
  member_id: string;
  name: string;
  email: string;
  picture_path: string;
  title: string;
  current_status: string;
  access_token: string;
  expired_date: string;
  refresh_token: string;
  refresh_expire_date: string;
}
