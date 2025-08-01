export type EducationInfo = {
  webSite: string;
  schoolImage: string;
  schoolName: string;
  schoolAddress: string;
  yearClass: string;
  major: string;
  degree: string;
  sportLevelType?: string;
  schoolID:string;
  schoolType:string;
  societies:string;
  degreeTypeID:string;
};

export type VideoInfo = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  defaultThumbnail: string;
};

export type PlaylistInfo = {
  id: string;
  title: string;
  defaultThumbnail: string;
};

export type BasicInfo = {
  currentStatus?: string;
  leftRightHandFoot?: string;
  preferredPosition?: string;
  secondaryPosition?: string;
  height?: string;
  weight?: string;
  sex?: string;
  memProfileDOB?: string;
  bio?: string;
  picturePath?: string;
  titleDesc?: string;
  firstName?:string;
  lastName?:string;
  middleName?:string;
  sport?:string;
  showSexInProfile?:string;
  showDOBType?:string;
  lookingForEmployment?:string;
  lookingForNetworking?:string;
  lookingForPartnership?:string;
  lookingForRecruitment?:string;
};

export type ContactInfo = {
  email?: string;
  otherEmail?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  cellPhone?: string;
  homePhone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  showCellPhone?: boolean;
  showHomePhone?: boolean;
  showAddress?: boolean;
  showEmailToMembers?:boolean;
  
};

export interface MemberData {
  memImage: string;
  memName: string;
  memTitle?: string;
  showAddAsContact?: boolean;
  showFollowMember?: boolean;
  onAddContact?: () => void;
  onFollow?: () => void;
  sport?: string;
  basicInfo?: BasicInfo;
  showSex?: string;
  showDOB?: string;
  memLookingFor?: string;
  contactInfo?: ContactInfo;
  education?: EducationInfo[];
  videos?: VideoInfo[];
  playList?: PlaylistInfo[];
}

export interface PhotosData {
  instagramURL: string;
}