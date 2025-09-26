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
  attachement: string;
  body: string;
  contact_name: string;
  contact_image: string;
  sender_image: string;
  contact_id: string;
  flag_level: string;
  importance_level: string;
  message_id: string;
  message_state: string;
  sender_id: string;
  subject: string;
  msg_date: string;
  from_id: string;
  first_name: string;
  full_body: string;
  selected: boolean;
}

export interface MemberNotificationsModel {
  notificationId: string;
  subject: string;
  notification: string;
  sentDate: string;
  status: boolean;
}

export interface SendMessageModel {
  to: string;
  from: string;
  subject: string;
  body: string;
  attachment: string;
  original_msg: string;
  message_id: number;
  sent_date: string;
  sender_picture: string;
}
