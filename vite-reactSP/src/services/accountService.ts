import type {
  ForgotPasswordFormInputs,
  LoginFormInputs,
  LoginResponse,
  ChangePasswordFormInputs,
  SignUpFormInputs,
} from "../types/account";
import { apiFetch } from "./api";

export async function loginUser(data: LoginFormInputs): Promise<LoginResponse> {
  const result = await apiFetch<LoginResponse>("/api/account/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("token", result.accessToken);
  return result;
}

export async function createUserAccount(
  data: SignUpFormInputs
): Promise<string> {
  const result = await apiFetch<string>("/api/account/register", {
    method: "POST",
    body: JSON.stringify(data),
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
