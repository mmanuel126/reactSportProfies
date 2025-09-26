import type {
  AccountSettings,
  NotificationBody,
  PrivacySettings,
  SearchSettings,
} from "../types/settings";
import { apiFetch } from "./api";

export async function getMemberNameInfo(
  memberId: string
): Promise<AccountSettings> {
  const data = await apiFetch<AccountSettings>(
    `/api/setting/name-info/${memberId}`,
    {
      method: "GET",
    }
  );
  if (!data) {
    throw new Error("No account settings data returned");
  }
  return data;
}

export async function getMemberNotifications(
  memberId: string
): Promise<NotificationBody> {
  const data = await apiFetch<NotificationBody>(
    `/api/setting/notifications/${memberId}`,
    {
      method: "GET",
    }
  );
  if (!data) {
    throw new Error("No notifications account settings data returned");
  }
  return data;
}

export async function saveMemberNameInfo(
  memberID: string,
  firstName: string,
  middleName: string,
  lastName: string
): Promise<void> {
  await apiFetch(
    `/api/setting/update-name-info/${memberID}?first_name=${firstName}&middle_name=${middleName}&last_name=${lastName}`,
    {
      method: "PUT",
    }
  );
}

export async function saveMemberEmailInfo(
  memberID: string,
  email: string
): Promise<void> {
  await apiFetch(`/api/setting/update-email-info/${memberID}?email=${email}`, {
    method: "PUT",
  });
}

export async function savePasswordInfo(
  memberID: string,
  pwd: string
): Promise<void> {
  await apiFetch(
    `/api/setting/save-password-info/${memberID}?password=${pwd}`,
    {
      method: "PUT",
    }
  );
}

export async function saveSecurityQuestionInfo(
  memberID: string,
  question: string,
  answer: string
): Promise<void> {
  await apiFetch(
    `/api/setting/save-security-question/${memberID}?question_id=${question}&answer=${answer}`,
    {
      method: "PUT",
    }
  );
}

export async function deactivateAccount(
  memberID: string,
  reason: string,
  explanation: string
): Promise<void> {
  const futureEmail = false;
  await apiFetch(
    `/api/setting/deactivate-account/${memberID}?reason=${reason}&explanation=${explanation}&future_email=${futureEmail}`,
    {
      method: "POST",
    }
  );
}

export async function saveNotificationSettings(
  memberID: string,
  body: NotificationBody
): Promise<void> {
  body.member_id = memberID;
  await apiFetch(`/api/setting/update-notifications/${memberID}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function getProfileSettings(
  memberId: string
): Promise<PrivacySettings> {
  const data = await apiFetch<PrivacySettings>(
    `/api/setting/profile-settings/${memberId}`,
    {
      method: "GET",
    }
  );
  if (!data) {
    throw new Error("No account settings data returned");
  }
  return data;
}

export async function saveProfileSettings(
  memberID: string,
  body: PrivacySettings
): Promise<void> {
  await apiFetch(`/api/setting/save-profile-settings/${memberID}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function getSearchSettings(
  memberId: string
): Promise<SearchSettings> {
  const data = await apiFetch<SearchSettings>(
    `/api/setting/privacy-search-settings/${memberId}`,
    {
      method: "GET",
    }
  );

  if (!data) {
    throw new Error("No account settings data returned");
  }
  return data;
}

export async function saveSearchSettings(
  memberID: string,
  body: SearchSettings
): Promise<void> {
  let vl = "0";
  if (body.view_link_to_request_adding_you_as_friend) vl = "1";
  await apiFetch(
    `/api/setting/save-privacy-search-settings/${memberID}?visibility=${body.visibility}&view_profile_picture=${body.view_profile_picture}&view_friends_list=${body.view_friends_list}&view_link_to_request_adding_you_as_friend=${vl}&view_link_to_send_you_msg=${body.view_link_to_send_you_msg}`,
    {
      method: "PUT",
    }
  );
}

export async function UploadProfilePhoto(
  memberId: string,
  file: File
): Promise<void> {
  const fd = new FormData();
  fd.append("image", file);

  await apiFetch(`/api/setting/upload-photo/${memberId}`, {
    method: "POST",
    body: fd,
  });
}
