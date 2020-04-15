export default async (gif, sig) => {
  const formData = new FormData();

  formData.append('file', gif);
  formData.append('folder', sig.folder);
  formData.append('signature', sig.signature);
  formData.append('timestamp', sig.timestamp);
  formData.append('api_key', sig.api_key);
  formData.append('public_id', sig.public_id);
  formData.append('upload_preset', sig.upload_preset);

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/shahzayb/video/upload',
    {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData,
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};
