import type {
  ForgotPasswordFormInputs,
  LoginFormInputs,
  LoginResponse,
  ChangePasswordFormInputs,
  SignUpFormInputs,
  User,
} from "../types/account";
import { apiFetch } from "./api";

export async function loginUser(data: LoginFormInputs): Promise<LoginResponse> {
  const result = await apiFetch<LoginResponse>("/api/account/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("token", result.access_token);
  return result;
}

export async function createUserAccount(
  data: SignUpFormInputs
): Promise<string> {
  interface RegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
    month: string;
    day: string;
    year: string;
    profile_type: string;
  }
  // Construct the object manually
  const apiPayload: RegisterPayload = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
    gender: data.gender,
    month: data.month,
    day: data.day,
    year: data.year,
    profile_type: data.profile_type,
  };
  console.log("p:", apiPayload);
  const result = await apiFetch<string>("/api/account/register", {
    method: "POST",
    body: JSON.stringify(apiPayload),
  });
  return result;
}

export async function resetPassword(
  data: ForgotPasswordFormInputs
): Promise<string> {
  const result = await apiFetch<string>(
    "/api/account/reset-password?email=" + data.email,
    {
      method: "POST",
    }
  );
  return result;
}

export async function isResetCodeExpired(code: string): Promise<string> {
  const result = await apiFetch<string>(
    "/api/account/is-reset-code-expired?code=" + code,
    {
      method: "POST",
    }
  );
  return result;
}

export async function changePassword(
  data: ChangePasswordFormInputs,
  email: string,
  code: string
): Promise<string> {
  const result = await apiFetch<string>(
    "/api/account/change-password?new_password=" +
      data.password +
      "&email=" +
      email +
      "&code=" +
      code,
    {
      method: "POST",
    }
  );
  return result;
}

export async function setMemberStatus(
  memberId: string,
  status: string
): Promise<string> {
  const url = `/api/account/set-member-status/${memberId}/${status}`;
  const result = await apiFetch<string>(url, {
    method: "PUT",
  });
  return result;
}

export async function validateNewRegisteredUser(
  emailParam: string,
  codeParam: string
): Promise<User> {
  interface NewRegisteredUser {
    email: string;
    code: string;
  }
  // Construct the object manually
  const payLoad: NewRegisteredUser = {
    email: emailParam,
    code: codeParam,
  };
  const url = `/api/account/login-new-registered-user`;
  const result = await apiFetch<User>(url, {
    method: "POST",
    body: JSON.stringify(payLoad),
  });
  return result;
}
