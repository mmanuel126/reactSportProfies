export interface PostItem {
  post_id: number;
  member_id: string;
  member_name: string;
  picture_path: string;
  description: string;
  date_posted: string;
  like_counter: number;
  child_post_cnt: number;
  children: ReplyItem[];
}

export interface ReplyItem {
  post_response_id: string;
  post_id: string;
  member_id: string;
  member_name: string;
  picture_path: string;
  description: string;
  date_responded: string;
}
