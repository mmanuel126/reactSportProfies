import { apiFetch } from "./api";
import type { SearchMessageInfo } from "../types/messages";

export async function getMemberMessages(
  memberId: string,
  showType: string
): Promise<SearchMessageInfo[]> {
  const data = await apiFetch(
    `/services/message/GetMemberMessages/${memberId}?showType=${showType}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function sendMessage(
    memberId: string,
    senderId: string,
    subject: string,
    msg: string
): Promise<void> {
  await apiFetch(
    `/services/message/CreateMessage?to=${senderId}&from=${memberId}&subject=${subject}&body=${msg}`,
    {
      method: "POST",
    }
  );
}

export async function toggleMessageState(status: string, msgID: string) 
: Promise<void> {
  await apiFetch(
    `/services/message/ToggleMessageState?status=${status}&msgID=${msgID}`,
    {
      method: "PUT",
    }
  );
}

export async function deleteMessage(msgID: string) 
: Promise<void> {
  await apiFetch(
    `/services/message/DeleteMessage/${msgID}`,
    {
      method: "DELETE",
    }
  );
}