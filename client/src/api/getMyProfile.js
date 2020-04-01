export default async jwtToken => {
  const url = '/api/user';
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
