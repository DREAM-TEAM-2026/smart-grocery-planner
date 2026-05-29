import { authClient } from '../auth';

export const apiFetch = async (endpoint, options = {}) => {
  const { data, error } = await authClient.token();

  console.log(data, error);

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // if (token) {
  //   headers['Authorization'] = `Bearer ${token}`;
  // }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(endpoint, config);

  if (!response.ok) {
    if (response.status === 401) {
      console.warn('Unauthorized API call. You may need to sign in again.');
    }
    const errorDetails = await response.text();
    throw new Error(`API call failed: ${response.status} - ${errorDetails}`);
  }

  return response.json();
};
