import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CameraOffIcon } from '../../assets/camera-off.svg';
import { ReactComponent as FlipCameraIcon } from '../../assets/flip_camera.svg';
import { ReactComponent as ClearIcon } from '../../assets/clear.svg';
import LiveCamera from '../LiveCamera/LiveCamera';
import css from './GifRecorder.module.css';

const GifVideoPlayer = props => {
  const { gif } = props;
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const video = videoRef.current;
    let videoURL = window.URL.createObjectURL(gif);
    video.src = videoURL;
    return () => {
      window.URL.revokeObjectURL(videoURL);
    };
  }, [gif, videoRef]);

  return (
    <video
      className="video"
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
    ></video>
  );
};

const GifRecorder = props => {
  const { onRecordSuccess } = props;

  const [isOff, setOff] = React.useState(false);
  const [isSupported, setSupported] = React.useState(true);
  const [isFront, setFront] = React.useState(true);
  const [gifVideo, setGifVideo] = React.useState(null);
  const [recording, setRecording] = React.useState(false);
  const [recorder, setRecorder] = React.useState(null);

  const constraint = React.useMemo(
    () => ({
      audio: false,
      video: {
        facingMode: {
          exact: isFront ? 'user' : 'environment'
        },
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        }
      }
    }),
    [isFront]
  );

  const streamMediaHandler = React.useCallback(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);
    setOff(false);
    setSupported(true);
  }, []);

  const streamMediaErrorHandler = React.useCallback(e => {
    if (e.name === 'NotAllowedError') {
      console.log('camera off');
      setOff(true);
    } else {
      console.log('browser does not support camera');
      setSupported(false);
    }
    console.log(e);
  }, []);

  const recordHandler = React.useCallback(
    e => {
      setRecording(true);
      const chunks = [];
      recorder.start();
      setTimeout(() => {
        recorder.stop();
      }, 1800);

      recorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
      };
      recorder.onstop = ev => {
        let blob = new Blob(chunks, { type: 'video/mp4;' });
        console.log(blob);
        setGifVideo(blob);

        setRecording(false);
        onRecordSuccess(blob);
        setRecorder(null);
      };
    },
    [recorder, onRecordSuccess]
  );

  const toggleCamera = React.useCallback(() => {
    setFront(!isFront);
  }, [isFront]);

  const clearGifVideo = React.useCallback(() => {
    setGifVideo(null);
  }, []);

  return (
    <div className={css.camContainer}>
      <div className={css.videoContainer}>
        {!gifVideo && (
          <LiveCamera
            constraint={constraint}
            onMediaStream={streamMediaHandler}
            onMediaStreamError={streamMediaErrorHandler}
          />
        )}
        {gifVideo && <GifVideoPlayer gif={gifVideo} />}
        {isOff && (
          <div className={css.errorContainer}>
            <CameraOffIcon
              width="32"
              height="32"
              fill="currentColor"
              className="pt1"
            />
            <span className="pt1">camera is off</span>
          </div>
        )}
        {!isSupported && (
          <div className={css.errorContainer}>
            <CameraOffIcon
              width="32"
              height="32"
              fill="currentColor"
              className="pt1"
            />
            <span className="pt1">camera is not supported</span>
          </div>
        )}
      </div>
      <hr />
      <div className={css.recordBox}>
        <button
          disabled={!gifVideo || recording || !isSupported || isOff}
          onClick={clearGifVideo}
          className="buttonReset"
        >
          <ClearIcon fill="currentColor" title="clear" />
        </button>
        <button
          disabled={recording || gifVideo || !isSupported || isOff}
          onClick={recordHandler}
          className={`${css.recordBtn} ${
            recording ? css.recording : css.notRecording
          }`}
        ></button>

        <button onClick={toggleCamera} className="buttonReset">
          <FlipCameraIcon fill="currentColor" title="flip camera" />
        </button>
      </div>
    </div>
  );
};

GifRecorder.propTypes = {
  onRecordSuccess: PropTypes.func.isRequired
};

export default GifRecorder;
