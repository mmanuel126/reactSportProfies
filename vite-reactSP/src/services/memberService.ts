import type {
  BasicInfo,
  ContactInfo,
  EducationInfo,
  PhotosData,
  PlaylistInfo,
  VideoInfo,
} from "../types/member";
import type { PostItem, ReplyItem } from "../types/posts";
import { apiFetch } from "./api";

//********************************************/
// *** here is post related APIs endpoints ***/
//********************************************/

export async function getRecentPosts(memberID: string): Promise<PostItem[]> {
  return await apiFetch<PostItem[]>(`/api/member/posts/${memberID}`, {
    method: "GET",
  });
}

export async function getPostReplies(postID: number): Promise<ReplyItem[]> {
  return await apiFetch(`/api/member/post-responses/${postID}`, {
    method: "GET",
  });
}

export async function incrementLikedPost(postID: number): Promise<void> {
  return await apiFetch(`/api/member/increment-post-like-counter/${postID}`, {
    method: "POST",
  });
}

export async function addPostReply(
  postID: number,
  memberID: string,
  text: string
): Promise<ReplyItem> {
  return await apiFetch(
    `/api/member/create-post-response/${memberID}/${postID}?post_msg=${text}`,
    {
      method: "POST",
    }
  );
}

export async function addNewPost(
  memberID: string,
  text: string
): Promise<PostItem> {
  return await apiFetch(
    `/api/member/create-post/${memberID}/?post_msg=${text}`,
    {
      method: "POST",
    }
  );
}

//*********************************************/
//*** here member profile related APIs.       */
//*********************************************/

export async function getBasicInfo(id: string): Promise<BasicInfo> {
  return await apiFetch(`/api/member/general-info/${id}`, {
    method: "GET",
  });
}

export async function getContactInfo(id: string): Promise<ContactInfo> {
  return await apiFetch(`/api/member/contact-info/${id}`, {
    method: "GET",
  });
}

export async function getEducationInfo(id: string): Promise<EducationInfo[]> {
  const response = await apiFetch(`/api/member/education-info/${id}`, {
    method: "GET",
  });

  const educationData = response as EducationInfo[];

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const updatedResponse = educationData.map((item: EducationInfo) => {
    return {
      ...item,
      //Degree: item.Degree || "N/A", // fallback if degree is missing
      web_site: item.school_image?.startsWith("http")
        ? item.school_image
        : `https://${item.school_image}`, // ensure https
      school_image: item.school_image
        ? `https://www.google.com/s2/favicons?domain=${item.school_image}`
        : `${BASE_URL}/static/images/members/default.png`,
    };
  });

  return updatedResponse;
}

export async function getVideosList(id: string): Promise<PlaylistInfo[]> {
  return await apiFetch(`/api/member/video-playlist/${id}`, {
    method: "GET",
  });
}

export async function getPlaylistVideos(id: string): Promise<VideoInfo[]> {
  return await apiFetch(`/api/member/youtube-videos/${id}`, {
    method: "GET",
  });
}

export async function checkIfToShowAsContact(
  loggedUserId: string,
  contactId: string
): Promise<boolean> {
  const response = await apiFetch(
    `/api/member/is-friend-by-contact-id/${loggedUserId}/${contactId}`,
    {
      method: "GET",
    }
  );

  if (loggedUserId != contactId && response == true) {
    return true;
  } else {
    return false;
  }
}

export async function checkIfToShowFollowMember(
  loggedUserId: string,
  contactId: string
): Promise<boolean> {
  const response = await apiFetch(
    `/api/member/is-following-contact/${loggedUserId}/${contactId}`,
    {
      method: "GET",
    }
  );

  if (loggedUserId != contactId && response != true) {
    return true;
  } else {
    return false;
  }
}

export async function saveBasicInfo(memberID: string, data: BasicInfo) {
  data.member_id = memberID;
  return await apiFetch(`/api/member/general-info`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function saveContactInfo(memberID: string, data: ContactInfo) {
  data.member_id = memberID;
  return await apiFetch(`/api/member/contact-info`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getInstagramURL(memberID: string): Promise<string> {
  return await apiFetch(`/api/member/instagram-url/${memberID}`, {
    method: "GET",
  });
}

export async function saveInstagramURL(memberID: string, data: PhotosData) {
  const postBody = {
    member_id: memberID,
    instagram_url: data.instagramURL,
  };
  return await apiFetch(`/api/member/instagram-url`, {
    method: "PUT",
    body: JSON.stringify(postBody),
  });
}

export async function getChannelID(memberID: string): Promise<string> {
  return await apiFetch(`/api/member/youtube-channel/${memberID}`, {
    method: "GET",
  });
}

export async function saveChannelID(memberID: string, channelID: string) {
  const postBody = {
    member_id: memberID,
    channel_id: channelID,
  };
  return await apiFetch(`/api/member/youtube-channel`, {
    method: "PUT",
    body: JSON.stringify(postBody),
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveNewSchool(memberId: string, body: any) {
  type UpdateInfo = {
    school_type: string;
    school_address: string;
    school_id: string;
    school_name: string;
    school_image: string;
    major: string;
    degree: string;
    degree_type_id: string;
    year_class: string;
    sport_level_type: string;
  };

  const data: UpdateInfo = {
    school_type: body.SchoolType,
    school_address: body.SchoolAddress,
    school_id: body.SchoolID,
    school_image: "",
    school_name: "",
    major: body.Major,
    degree: body.Degree,
    degree_type_id: body.Degree,
    year_class: body.YearClass,
    sport_level_type: body.SportLevelType,
  };

  return await apiFetch(`/api/member/add-school/${memberId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function removeSchool(
  memberId: string,
  instId: string,
  instType: string
) {
  return await apiFetch(
    `/api/member/remove-school?member_id=${memberId}&inst_id=${instId}&inst_type=${instType}`,
    {
      method: "DELETE",
    }
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateSchool(memberId: string, body: any) {
  type UpdateInfo = {
    school_image: string;
    school_name: string;
    school_address: string;
    year_class: string;
    major: string;
    degree: string;
    sport_level_type?: string;
    school_id: string;
    school_type: string;
    degree_type_id: string;
  };

  const data: UpdateInfo = {
    school_image: "",
    school_name: "",
    school_address: "",
    year_class: body.YearClass,
    major: body.Major,
    degree: body.degree,
    sport_level_type: body.SportLevelType,
    school_id: body.school_id,
    school_type: body.school_type,
    degree_type_id: body.Degree,
  };

  return await apiFetch(`/api/member/update-school/${memberId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
