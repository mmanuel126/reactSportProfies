import type {
  ForgotPasswordFormInputs,
  LoginFormInputs,
  LoginResponse,
  ChangePasswordFormInputs,
} from "../types/account";
import { apiFetch } from "./api";

export async function loginUser(data: LoginFormInputs): Promise<LoginResponse> {
  const result = await apiFetch<LoginResponse>("/services/account/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("token", result.accessToken);
  return result;
}

export async function createUserAccount(
  data: LoginFormInputs
): Promise<string> {
  const result = await apiFetch<string>("/services/account/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return result;
}

export async function resetPassword(
  data: ForgotPasswordFormInputs
): Promise<string> {
  const result = await apiFetch<string>(
    "/services/account/resetPassword?email=" + data.email,
    {
      method: "GET",
      
    }
  );
  return result;
}

export async function isResetCodeExpired(code: string): Promise<string> {
  const result = await apiFetch<string>(
    "/services/Account/IsResetCodeExpired?code=" + code,
    {
      method: "GET"
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
    "/services/account/changePassword?pwd=" +
      data.password +
      "&email=" +
      email +
      "&code=" +
      code,
    {
      method: "GET",
    }
  );
  return result;
}

export async function setMemberStatus(
  memberId: string,
  status: string
): Promise<string> {
  const url = `services/member/setMemberStatus?memberId=${memberId}&status=${status}`;
  const result = await apiFetch<string>(url, {
    method: "GET",
  });
  return result;
}
