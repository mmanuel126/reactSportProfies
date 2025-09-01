import { apiFetch } from "./api";
import type { SearchMessageInfo, SendMessageModel } from "../types/messages";

export async function getMemberMessages(
  memberId: string,
  showType: string
): Promise<SearchMessageInfo[]> {
  const data = await apiFetch(
    `/api/message/messages/${memberId}?type=Inbox&show_type=${showType}`,
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
  const data: SendMessageModel = {
    From: memberId,
    To: senderId.toString(),
    Subject: subject,
    Body: msg,
    Attachment: "",
    OriginalMsg: "",
    MessageID: 0,
    SentDate: "2025-08-27T19:21:08.702Z",
    SenderPicture: "",
  };

  await apiFetch(`/api/message/send-message`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function toggleMessageState(
  status: string,
  msgID: string
): Promise<void> {
  await apiFetch(
    `/api/message/toggle-message-state?status=${status}&msg_id=${msgID}`,
    {
      method: "PUT",
    }
  );
}

export async function deleteMessage(msgID: string): Promise<void> {
  await apiFetch(`/api/message/delete/${msgID}`, {
    method: "DELETE",
  });
}

export async function totalUnreadMessages(memberID: string): Promise<number> {
  return await apiFetch(`/api/message/total-unread-messages/${memberID}`, {
    method: "GET",
  });
}
