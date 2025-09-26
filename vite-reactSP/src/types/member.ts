export type EducationInfo = {
  web_site: string;
  school_image: string;
  school_name: string;
  school_address: string;
  year_class: string;
  major: string;
  degree: string;
  sport_level_type?: string;
  school_id: string;
  school_type: string;
  societies: string;
  degree_type_id: string;
};

export type VideoInfo = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  defaultThumbnail: string;
  defaultThumbnailHeight: string;
  defaultThumbnailWidth: string;
};

export type PlaylistInfo = {
  id: string;
  title: string;
  description: string;
  defaultThumbnail: string;
};

export type BasicInfo = {
  member_id: string;
  current_status?: string;
  left_right_hand_foot?: string;
  preferred_position?: string;
  secondary_position?: string;
  height?: string;
  weight?: string;
  sex?: string;
  dob_month?: string;
  dob_day?: string;
  dob_year?: string;
  bio?: string;
  picture_path?: string;
  title_desc?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  sport?: string;
  show_sex_in_profile?: string;
  show_dob_type?: string;
  looking_for_employment?: string;
  looking_for_networking?: string;
  looking_for_partnership?: string;
  looking_for_recruitment?: string;
};

export type ContactInfo = {
  member_id: string;
  email?: string;
  other_email?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  cell_phone?: string;
  home_phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  show_cell_phone?: boolean;
  show_home_phone?: boolean;
  show_address?: boolean;
  show_email_to_members?: boolean;
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
