import { serverBaseUrl } from '../config/env';

export default async (gif, text) => {
  const jwtToken = localStorage.getItem('token') || '';
  const url = serverBaseUrl + '/api/post/';

  const data = new FormData();
  data.append('gif', gif);
  data.append('title', text);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`
    },
    body: data
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};
