export default (id) => {
  const jwtToken = localStorage.getItem('token') || '';
  const url = `/api/post/${id}`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  }).then((response) => {
    if (response.ok) {
      return Promise.resolve('success');
    } else {
      return Promise.reject(response);
    }
  });
};
