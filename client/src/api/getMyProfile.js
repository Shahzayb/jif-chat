export default jwtToken => {
  const url = '/api/user';
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  });
};
