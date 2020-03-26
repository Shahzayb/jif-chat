import React from 'react';
import PropTypes from 'prop-types';

function stopStreamedVideo(videoElem) {
  if (videoElem && videoElem.srcObject) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });

    videoElem.srcObject = null;
  }
}

const LiveCamera = props => {
  const { constraint, onMediaStreamError, onMediaStream } = props;
  const liveVideoRef = React.useRef(null);

  React.useEffect(() => {
    const video = liveVideoRef.current;
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      window.navigator.mediaDevices
        .getUserMedia(constraint)
        .then(stream => {
          video.srcObject = stream;
          onMediaStream(stream);
        })
        .catch(onMediaStreamError);

      video.onloadedmetadata = function(ev) {
        video.play();
      };
    } else {
      onMediaStreamError(new Error('camera not supported'));
    }
    return () => {
      stopStreamedVideo(video);
    };
  }, [liveVideoRef, constraint, onMediaStreamError, onMediaStream]);

  return (
    <video
      className="video"
      ref={liveVideoRef}
      autoPlay
      loop
      muted
      playsInline
    ></video>
  );
};

LiveCamera.propTypes = {
  onMediaStream: PropTypes.func,
  onMediaStreamError: PropTypes.func,
  constraint: PropTypes.object.isRequired
};

LiveCamera.defaultProps = {};

export default LiveCamera;
