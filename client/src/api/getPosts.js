import { pageSize } from '../config/env';

export default page => {
  const url = `/api/post?page=${page}&size=${pageSize}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  });
};
