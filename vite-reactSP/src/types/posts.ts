export interface PostItem {
  PostID: number;
  MemberID: string;
  MemberName: string;
  PicturePath: string;
  Description: string;
  DatePosted: string;
  LikeCounter: number;
  ChildPostCnt: number;
  Children: ReplyItem[];
}

export interface ReplyItem {
  PostResponseID: string;
  PostID: string;
  MemberID: string;
  MemberName: string;
  PicturePath: string;
  Description: string;
  DateResponded: string;
}
