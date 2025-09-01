export interface AccountSettings {
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  Email?: string;
  SecurityQuestion?: string;
  SecurityAnswer?: string;
  PassWord?: string;
}

export interface PrivacySettings {
  ID?: string;
  MemberID?: string;
  Profile?: string;
  BasicInfo?: string;
  PersonalInfo?: string;
  PhotosTagOfYou?: string;
  VideosTagOfYou?: string;
  ContactInfo?: string;
  Education?: string;
  WorkInfo?: string;
  IMdisplayName?: string;
  MobilePhone?: string;
  OtherPhone?: string;
  EmailAddress?: string;
  Visibility?: string;
  ViewProfilePicture?: string;
  ViewFriendsList?: string;
  ViewLinksToRequestAddingYouAsFriend?: string;
  ViewLinkTSendYouMsg?: string;
  Email?: string;
}

export interface SearchSettings {
  Visibility?: string;
  ViewProfilePicture?: boolean;
  ViewFriendsList?: boolean;
  ViewLinksToRequestAddingYouAsFriend?: boolean;
  ViewLinkTSendYouMsg?: boolean;
}

export interface NotificationBody {
  MemberID?: string;
  SendMsg?: boolean;
  AddAsFriend?: boolean;
  ConfirmFriendShipRequest?: boolean;
  RepliesToYourHelpQuest?: boolean;
}
