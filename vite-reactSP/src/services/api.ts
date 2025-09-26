const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://sp-api-app.vercel.app";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData
        ? {} // Don't set Content-Type when using FormData
        : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Request failed");
  }

  const contentType = res.headers.get("Content-Type");

  if (contentType?.includes("application/json")) {
    return res.json();
  } else {
    return res.text() as unknown as Promise<T>;
  }
}
