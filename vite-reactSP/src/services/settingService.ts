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
  const data = await apiFetch<AccountSettings[]>(
    `/services/setting/GetMemberNameInfo/${memberId}`,
    {
      method: "GET",
    }
  );
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No account settings data returned");
  }
  return data[0];
}

export async function getMemberNotifications(
  memberId: string
): Promise<NotificationBody> {
  const data = await apiFetch<NotificationBody[]>(
    `/services/setting/GetMemberNotifications/${memberId}`,
    {
      method: "GET",
    }
  );
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No account settings data returned");
  }
  return data[0];
}

export async function saveMemberNameInfo(
  memberID: string,
  firstName: string,
  middleName: string,
  lastName: string
): Promise<void> {
  await apiFetch(
    `/services/setting/SaveMemberNameInfo/${memberID}?fName=${firstName}&mName=${middleName}&lName=${lastName}`,
    {
      method: "PUT",
    }
  );
}

export async function saveMemberEmailInfo(
  memberID: string,
  email: string
): Promise<void> {
  await apiFetch(
    `/services/setting/SaveMemberEmailInfo/${memberID}?email=${email}`,
    {
      method: "PUT",
    }
  );
}

export async function savePasswordInfo(
  memberID: string,
  pwd: string
): Promise<void> {
  const postBody = {
    memberID: memberID,
    pwd: pwd,
  };
  await apiFetch(`/services/setting/SavePasswordInfo`, {
    method: "PUT",
    body: JSON.stringify(postBody),
  });
}

export async function saveSecurityQuestionInfo(
  memberID: string,
  question: string,
  answer: string
): Promise<void> {
  await apiFetch(
    `/services/setting/SaveSecurityQuestionInfo/${memberID}?questionID=${question}&answer=${answer}`,
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
    `/services/setting/DeactivateAccount/${memberID}?reason=${reason}&explanation=${explanation}&futureEmail=${futureEmail}`,
    {
      method: "PUT",
    }
  );
}

export async function saveNotificationSettings(
  memberID: string,
  body: NotificationBody
): Promise<void> {
  await apiFetch(`/services/setting/SaveNotificationSettings/${memberID}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function getProfileSettings(
  memberId: string
): Promise<PrivacySettings> {
  const data = await apiFetch<PrivacySettings[]>(
    `/services/setting/GetProfileSettings/${memberId}`,
    {
      method: "GET",
    }
  );
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No account settings data returned");
  }
  return data[0];
}

export async function saveProfileSettings(
  memberID: string,
  body: PrivacySettings
): Promise<void> {
  await apiFetch(`/services/setting/SaveProfileSettings/${memberID}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function getSearchSettings(
  memberId: string
): Promise<SearchSettings> {
  const data = await apiFetch<SearchSettings[]>(
    `/services/setting/GetPrivacySearchSettings/${memberId}`,
    {
      method: "GET",
    }
  );

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No account settings data returned");
  }
  return data[0];
}

export async function saveSearchSettings(
  memberID: string,
  body: SearchSettings
): Promise<void> {
  await apiFetch(
    `/services/setting/SavePrivacySearchSettings/${memberID}
        ?visibility=${body.visibility}&viewProfilePicture=${body.viewProfilePicture}
        &viewFriendsList=${body.viewFriendsList}&viewLinkToRequestAddingYouAsFriend=${body.viewLinksToRequestAddingYouAsFriend}
        &viewLinkToSendYouMsg=${body.viewLinkTSendYouMsg}`,
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

  await apiFetch(`/services/member/UploadProfilePhoto/${memberId}`, {
    method: "POST",
    body: fd,
    headers: {}
  });
}
