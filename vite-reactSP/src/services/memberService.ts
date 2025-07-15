import type { PostItem, ReplyItem } from "../types/posts";
import { apiFetch } from "./api";

export async function getRecentPosts(memberID:string): Promise<PostItem[]> {
  return await apiFetch<PostItem[]>(`/services/member/getRecentPosts/${memberID}`, {
    method: "GET",
  });
}

export async function getPostReplies(postID: number): Promise<ReplyItem[]> {
  return await apiFetch(`/services/member/getRecentPostResponses/${postID}`, {
    method: "GET",
  });
}