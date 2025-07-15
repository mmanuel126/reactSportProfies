/**** interfaces for the Login form ****/

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface LoginResponse {
    name:string;
    email: string;
    memberID: string;
    picturePath: string;
    accessToken: string;
    title: string;
    currentStatus: string;
}

/**** interfaces for the SignIn form */

export interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  profileType: string;
  termsAccepted: boolean;
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