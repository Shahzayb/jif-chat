export default async () => {
  const jwtToken = localStorage.getItem('token') || '';
  const url = `/api/cloudinary/signature`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};
