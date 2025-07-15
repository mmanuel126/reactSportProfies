export interface PostItem {
  postID: number;
  memberID: string;
  memberName: string;
  picturePath: string;
  description: string;
  datePosted: string;
  likeCount: number;
  replyCount: number;
  children: ReplyItem[];
}

export interface ReplyItem {
  postResponseID: string;
  postID: string;  
  memberID: string;
  memberName: string;
  picturePath: string;
  description: string;
  dateResponded: string;
}