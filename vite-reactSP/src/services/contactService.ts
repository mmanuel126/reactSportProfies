import type { Search } from "../types/search";
import { apiFetch } from "./api";
import type { Contact } from "../types/contact";

export async function getSearchList(
  memberId: string,
  query: string
): Promise<Search[]> {
  const data = await apiFetch(
    `/api/contact/search-results?member_id=${memberId}&search_text=${query}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function getPeopleIFollow(memberID: string): Promise<Contact[]> {
  const data = await apiFetch(
    `/api/contact/people-iam-following?member_id=${memberID}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function getPeopleFollowingMe(
  memberID: string
): Promise<Contact[]> {
  const data = await apiFetch(
    `/api/contact/whose-following-me?member_id=${memberID}`,
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
    `/api/contact/unfollow-member?member_id=${memberID}&contact_id=${contactID}`,
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
    `/api/contact/follow-member?member_id=${memberID}&contact_id=${contactID}`,
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
    `/api/contact/send-request?member_id=${memberID}&contact_id=${contactID}`,
    {
      method: "POST",
    }
  );
}

export async function getMyContacts(
  memberID: string,
  searchText: string
): Promise<Contact[]> {
  if (searchText == "") {
    const data = await apiFetch(`/api/contact/contacts?member_id=${memberID}`, {
      method: "GET",
    });
    return Array.isArray(data) ? data : []; // ensure it's an array
  } else {
    const data = await apiFetch(
      `/api/contact/search-member-contacts?member_id=${memberID}&search_text=${searchText}`,
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
    `/api/contact/delete-contact?member_id=${memberID}&contact_id=${contactID}`,
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
    `/api/contact/accept-request?member_id=${memberID}&contact_id=${contactID}`,
    {
      method: "POST",
    }
  );
}

export async function rejectRequest(
  memberID: string,
  contactID: string
): Promise<void> {
  await apiFetch(
    `/api/contact/reject-request?member_id=${memberID}&contact_id=${contactID}`,
    {
      method: "POST",
    }
  );
}

export async function getContactRequests(memberId: string): Promise<Contact[]> {
  const data = await apiFetch(`/api/contact/requests?member_id=${memberId}`, {
    method: "GET",
  });
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function getSearchContacts(
  memberId: string,
  searchText: string
): Promise<Contact[]> {
  const data = await apiFetch(
    `/api/contact/search-contacts?user_id=${memberId}&search_text=${searchText}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}

export async function getMySuggestions(memberId: string): Promise<Contact[]> {
  const data = await apiFetch(
    `/api/contact/suggestions?member_id=${memberId}`,
    {
      method: "GET",
    }
  );
  return Array.isArray(data) ? data : []; // ensure it's an array
}
