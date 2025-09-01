export interface MessageInfo {
  messageID: string;
  sentDate: string;
  from: string;
  senderPicture: string;
  body: string;
  subject: string;
  attachmentFile: string;
  orginalMsg: string;
}

export interface SearchMessageInfo {
  Attachement: string;
  Body: string;
  ContactName: string;
  ContactImage: string;
  SenderImage: string;
  ContactID: string;
  FlagLevel: string;
  ImportanceLevel: string;
  MessageID: string;
  MessageState: string;
  SenderID: string;
  Subject: string;
  MsgDate: string;
  FromID: string;
  FirstName: string;
  FullBody: string;
  Selected: boolean;
}

export interface MemberNotificationsModel {
  notificationId: string;
  subject: string;
  notification: string;
  sentDate: string;
  status: boolean;
}

export interface SendMessageModel {
  To: string;
  From: string;
  Subject: string;
  Body: string;
  Attachment: string;
  OriginalMsg: string;
  MessageID: number;
  SentDate: string;
  SenderPicture: string;
}
