const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sportprofiles.space';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Request failed');
  }

  const contentType = res.headers.get('Content-Type');

  if (contentType?.includes('application/json')) {
    return res.json() 
  } else {
    return res.text() as unknown as Promise<T>;
  }
  
  //return res.json();
}
