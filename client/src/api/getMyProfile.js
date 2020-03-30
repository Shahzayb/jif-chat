import { serverBaseUrl } from '../config/env';

export default async jwtToken => {
  const url = serverBaseUrl + '/api/user';
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    }
  });
  if (response.ok) {
    return await response.json();
  } else {
    Promise.reject(response);
  }
};
