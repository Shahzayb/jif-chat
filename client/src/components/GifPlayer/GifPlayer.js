import React from 'react';
import { Video, Transformation } from 'cloudinary-react';

const GifPlayer = (props) => {
  return (
    <Video
      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      publicId={props.publicId}
      autoPlay
      loop
      muted
      playsInline
      className="video"
    >
      <Transformation
        responsive
        crop="limit"
        width="600"
        dpr="auto"
        quality="auto"
        fetchFormat="auto"
        videoCodec="auto"
      />
    </Video>
  );
};

export default GifPlayer;
