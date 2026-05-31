import { authClient } from '../auth';

export const apiFetch = async (path, options = {}) => {
  const {
    requireToken = false,
    requireTimezone = false,
    ...fetchOptions
  } = options;

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const headers = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {}),
  };

  if (requireToken) {
    const { data, error } = await authClient.token();
    if (error) throw error;

    if (data?.session?.token) {
      headers['Authorization'] = `Bearer ${data.session.token}`;
    }
  }

  if (requireTimezone) {
    headers['x-timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const config = {
    ...fetchOptions,
    headers,
  };

  const response = await fetch(`${baseUrl}/${path}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      console.warn('Unauthorized API call. You may need to sign in again.');
    }
    const errorDetails = await response.text();
    throw new Error(`API call failed: ${response.status} - ${errorDetails}`);
  }

  if (
    response.status === 204 ||
    response.headers.get('content-length') === '0'
  ) {
    return null;
  }

  return response.json();
};
