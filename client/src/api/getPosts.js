import { pageSize } from '../config/env';

export default (afterId) => {
  const url = `/api/post?${
    afterId ? `after_id=${afterId}&` : ''
  }size=${pageSize}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  });
};
