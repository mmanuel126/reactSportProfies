// services/newsService.ts
import type { NewsItem } from "../types/news";
import { apiFetch } from "./api";

// ⛏️ Change return type to NewsItem[]
export async function getRecentNews(): Promise<NewsItem[]> {
  return await apiFetch<NewsItem[]>("/services/common/getRecentNews", {
    method: "GET",
  });
}
