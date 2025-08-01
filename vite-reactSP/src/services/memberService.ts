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
  return await apiFetch<PostItem[]>(
    `/services/member/getRecentPosts/${memberID}`,
    {
      method: "GET",
    }
  );
}

export async function getPostReplies(postID: number): Promise<ReplyItem[]> {
  return await apiFetch(`/services/member/getRecentPostResponses/${postID}`, {
    method: "GET",
  });
}

export async function incrementLikedPost(postID: number): Promise<void> {
  return await apiFetch(`/services/member/ImcrementPostLikeCounter/${postID}`, {
    method: "POST",
  });
}

export async function addPostReply(
  postID: number,
  memberID: string,
  text: string
): Promise<ReplyItem> {
  return await apiFetch(
    `/services/member/CreatePostComment/${memberID}/${postID}?postMsg=${text}`,
    {
      method: "GET",
    }
  );
}

export async function addNewPost(
  memberID: string,
  text: string
): Promise<PostItem> {
  return await apiFetch(
    `/services/member/CreateMemberPost/${memberID}/?postMsg=${text}`,
    {
      method: "POST",
    }
  );
}

//*********************************************/
//*** here member profile related APIs.       */
//*********************************************/

export async function getBasicInfo(id: string): Promise<BasicInfo> {
  return await apiFetch(`/services/member/GetMemberGeneralInfoV2/${id}`, {
    method: "GET",
  });
}

export async function getContactInfo(id: string): Promise<ContactInfo> {
  return await apiFetch(`/services/member/GetMemberContactInfo/${id}`, {
    method: "GET",
  });
}

export async function getEducationInfo(id: string): Promise<EducationInfo[]> {
  const response = await apiFetch(
    `/services/member/GetMemberEducationInfo/${id}`,
    {
      method: "GET",
    }
  );

  const educationData = response as EducationInfo[];

  const updatedResponse = educationData.map((item: EducationInfo) => {
    return {
      ...item,
      degree: item.degree || "N/A", // fallback if degree is missing
      webSite: item.schoolImage?.startsWith("http")
        ? item.schoolImage
        : `https://${item.schoolImage}`, // ensure https
      schoolImage: item.schoolImage
        ? `https://www.google.com/s2/favicons?domain=${item.schoolImage}`
        : "http://www.marcman.xyz/assets/images/members/default.png",
    };
  });

  return updatedResponse;
}

export async function getVideosList(id: string): Promise<VideoInfo[]> {
  return await apiFetch(`/services/member/GetVideosList/${id}`, {
    method: "GET",
  });
}

export async function getPlaylists(id: string): Promise<PlaylistInfo[]> {
  return await apiFetch(`/services/member/GetVideoPlayList/${id}`, {
    method: "GET",
  });
}

export async function checkIfToShowAsContact(
  loggedUserId: string,
  contactId: string
): Promise<boolean> {
  const response = await apiFetch(
    `/services/member/IsFriendByContactID/${loggedUserId}/${contactId}`,
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
    `/services/member/IsFollowingContact?memberID=${loggedUserId}&contactID=${contactId}`,
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
  return await apiFetch(`/services/member/SaveMemberGeneralInfo/${memberID}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function saveContactInfo(memberID: string, data: ContactInfo) {
  return await apiFetch(`/services/member/SaveMemberContactInfo/${memberID}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getInstagramURL(memberID: string): Promise<string> {
  return await apiFetch(`/services/member/GetInstagramURL/${memberID}`, {
    method: "GET",
  });
}

export async function saveInstagramURL(memberID: string, data: PhotosData) {
  const postBody = {
    memberID: memberID,
    instagramURL: data.instagramURL,
  };
  return await apiFetch(`/services/member/SetInstagramURL`, {
    method: "PUT",
    body: JSON.stringify(postBody),
  });
}

export async function getChannelID(memberID: string): Promise<string> {
  return await apiFetch(`/services/member/GetYoutubeChannel/${memberID}`, {
    method: "GET",
  });
}

export async function saveChannelID(memberID: string, channelID: string) {
  const postBody = {
    memberID: memberID,
    channelID: channelID,
  };
  return await apiFetch(`/services/member/SetYoutubeChannel`, {
    method: "PUT",
    body: JSON.stringify(postBody),
  });
}

export async function saveNewSchool(memberId: string, body: EducationInfo) {
  return await apiFetch(`/services/member/AddMemberSchool/${memberId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function removeSchool(
  memberId: string,
  instId: string,
  instType: string
) {
  return await apiFetch(
    `/services/member/RemoveMemberSchool?memberID=${memberId}&instID=${instId}&instType=${instType}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateSchool(memberId: string, body: EducationInfo) {
  return await apiFetch(`/services/member/UpdateMemberSchool/${memberId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
