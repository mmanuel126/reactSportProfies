import type { Search } from "../types/search";
import { apiFetch } from "./api";
import type { Contact } from "../types/contact";

export async function getSearchList(
  memberId: string,
  query: string
): Promise<Search[]> {
  const data = await apiFetch(
    `/services/contact/SearchResults?memberID=${memberId}&searchText=${query}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function getPeopleIFollow(memberID: string): Promise<Contact[]> {
  const data = await apiFetch(
    `/services/contact/GetPeopleIFollow?memberID=${memberID}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function getPeopleFollowingMe(memberID: string): Promise<Contact[]> {
  const data = await apiFetch(
    `/services/contact/GetWhosFollowingMe?memberID=${memberID}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function unfollowPerson(
  memberID: string,
  contactID: string
): Promise<void> {
  await apiFetch(
    `/services/contact/UnfollowMember?memberID=${memberID}&contactID=${contactID}`,
    {
      method: "POST",
    }
  );
}

export async function followContact(
  memberID: string,
  contactID: string
): Promise<void> {
  await apiFetch(
    `/services/contact/FollowMember?memberID=${memberID}&contactID=${contactID}`,
    {
      method: "POST",
    }
  );
}

export async function addContact(
  memberID: string,
  contactID: string
): Promise<void> {
  await apiFetch(
    `/services/contact/SendRequestContact?memberID=${memberID}&contactID=${contactID}`,
    {
      method: "PUT",
    }
  );
}

export async function getMyContacts(
  memberID: string,
  searchText: string
): Promise<Contact[]> {
  if (searchText == "") {
    const data = await apiFetch(
      `/services/contact/GetMemberContacts?memberID=${memberID}&show=`,
      {
        method: "GET",
      }
    );
    return Array.isArray(data) ? data : []; // ensure it's an array
  } else {
    const data = await apiFetch(
      `/services/contact/SearchMemberContacts?memberID=${memberID}&searchText=${searchText}&show=`,
      {
        method: "GET",
      }
    );

    return Array.isArray(data) ? data : []; // ensure it's an array
  }
}

export async function deleteContact(
  memberID: string,
  contactID: string
): Promise<void> {
  await apiFetch(
    `/services/contact/DeleteContact?memberID=${memberID}&contactID=${contactID}`,
    {
      method: "DELETE",
    }
  );
}

export async function acceptRequest(
  memberID: string,
  contactID: string
): Promise<void> {
  await apiFetch(
    `/services/contact/AcceptRequest?memberID=${memberID}&contactID=${contactID}`,
    {
      method: "PUT",
    }
  );
}

export async function rejectRequest(
  memberID: string,
  contactID: string
): Promise<void> {
  await apiFetch(
    `/services/contact/RejectRequest?memberID=${memberID}&contactID=${contactID}`,
    {
      method: "PUT",
    }
  );
}

export async function getContactRequests(
  memberId: string
): Promise<Contact[]> {
  const data = await apiFetch(
    `/services/contact/GetRequestsList?memberID=${memberId}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}


export async function getSearchContacts(
  memberId: string, searchText:string
): Promise<Contact[]> {
  const data = await apiFetch(
    `/services/contact/GetSearchContacts?userID=${memberId}&searchText=${searchText}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function getMySuggestions(
  memberId: string
): Promise<Contact[]> {
  const data = await apiFetch(
    `/services/contact/GetMemberSuggestions?memberID=${memberId}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}




