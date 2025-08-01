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
    contactName: string;
    contactImage: string;
    senderImage: string;
    contactID: string;
    flagLevel: string;
    importanceLevel: string;
    messageID: string;
    messageState: string;
    senderID: string;
    subject: string;
    msgDate: string;
    fromID: string;
    firstName: string;
    fullBody: string;
    selected: boolean;
}

export interface MemberNotificationsModel {
	notificationId: string;
	subject: string;
	notification: string;
	sentDate: string;
	status: boolean
}