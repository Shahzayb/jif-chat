export default async (publicId, title) => {
  const url = `/api/post/ticket`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicId, title }),
  });
  if (response.ok) {
    return response;
  } else {
    return Promise.reject(response);
  }
};
