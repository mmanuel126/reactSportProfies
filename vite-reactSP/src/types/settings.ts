export interface AccountSettings {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  email?: string;
  security_question?: string;
  security_answer?: string;
  passWord?: string;
}

export interface PrivacySettings {
  id?: string;
  member_id?: string;
  profile?: string;
  basic_info?: string;
  personal_info?: string;
  photos_tag_of_you?: string;
  videos_tag_of_you?: string;
  contact_info?: string;
  education?: string;
  work_info?: string;
  im_display_name?: string;
  mobile_phone?: string;
  other_phone?: string;
  email_address?: string;
  visibility?: string;
  view_profile_picture?: string;
  view_friends_list?: string;
  view_link_to_request_adding_you_as_friend?: string;
  view_link_to_send_you_msg?: string;
  email?: string;
}

export interface SearchSettings {
  visibility?: string;
  view_profile_picture?: boolean;
  view_friends_list?: boolean;
  view_link_to_request_adding_you_as_friend?: boolean;
  view_link_to_send_you_msg?: boolean;
}

export interface NotificationBody {
  member_id?: string;
  send_msg?: boolean;
  add_as_friend?: boolean;
  confirm_friendship_request?: boolean;
  replies_to_your_help_quest?: boolean;
}
