export type EducationInfo = {
  WebSite: string;
  SchoolImage: string;
  SchoolName: string;
  SchoolAddress: string;
  YearClass: string;
  Major: string;
  Degree: string;
  SportLevelType?: string;
  SchoolID: string;
  SchoolType: string;
  Societies: string;
  DegreeTypeID: string;
};

export type VideoInfo = {
  Id: string;
  Title: string;
  Description: string;
  PublishedAt: string;
  DefaultThumbnail: string;
  DefaultThumbnailHeight: string;
  DefaultThumbnailWidth: string;
};

export type PlaylistInfo = {
  id: string;
  title: string;
  description: string;
  defaultThumbnail: string;
};

export type BasicInfo = {
  MemberID: string;
  CurrentStatus?: string;
  LeftRightHandFoot?: string;
  PreferredPosition?: string;
  SecondaryPosition?: string;
  Height?: string;
  Weight?: string;
  Sex?: string;
  MemProfileDOB?: string;
  Bio?: string;
  PicturePath?: string;
  TitleDesc?: string;
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  Sport?: string;
  ShowSexInProfile?: string;
  ShowDOBType?: string;
  LookingForEmployment?: string;
  LookingForNetworking?: string;
  LookingForPartnership?: string;
  LookingForRecruitment?: string;
};

export type ContactInfo = {
  MemberID: string;
  Email?: string;
  OtherEmail?: string;
  Facebook?: string;
  Instagram?: string;
  Twitter?: string;
  Website?: string;
  CellPhone?: string;
  HomePhone?: string;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  ShowCellPhone?: boolean;
  ShowHomePhone?: boolean;
  ShowAddress?: boolean;
  ShowEmailToMembers?: boolean;
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
