export default async code => {
  const url = '/api/auth/google';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(code)
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};
