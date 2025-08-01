export interface AccountSettings { 
  firstName?: string;
  lastName?: string;
  middleName?:string;
  email?:string;
  securityQuestion?:string;
  securityAnswer?:string;
  passWord?: string;
}

export interface PrivacySettings {
    ID?: string;
    memberID?: string;
    profile?: string;
    basicInfo?: string;
    personalInfo?: string;
    photosTagOfYou?: string;
    videosTagOfYou?: string;
    contactInfo?: string;
    education?: string;
    workInfo?: string;
    IMdisplayName?: string;
    mobilePhone?: string;
    otherPhone?: string;
    emailAddress?: string;
    visibility?: string;
    viewProfilePicture?: string;
    viewFriendsList?: string;
    viewLinksToRequestAddingYouAsFriend?: string;
    viewLinkTSendYouMsg?: string;
    email?: string;
}

export interface SearchSettings {
  visibility: string;
  viewProfilePicture: boolean;
  viewFriendsList: boolean;
  viewLinksToRequestAddingYouAsFriend: boolean;
  viewLinkTSendYouMsg: boolean;
}

export interface NotificationBody  {
    memberId: string;
    sendMsg: boolean ;
    addAsFriend: boolean ;
    confirmFriendShipRequest: boolean;
    repliesToYourHelpQuest: boolean;
}

