import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CameraOffIcon } from '../../assets/camera-off.svg';
import { ReactComponent as FlipCameraIcon } from '../../assets/flip_camera.svg';
import { ReactComponent as ClearIcon } from '../../assets/clear.svg';
import LiveCamera from '../LiveCamera/LiveCamera';
import css from './GifRecorder.module.css';

const GifVideoPlayer = (props) => {
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

const GifRecorder = (props) => {
  const { gifVideo, setGifVideo, disabled = false, required } = props;

  const [isOff, setOff] = React.useState(false);
  const [isSupported, setSupported] = React.useState(true);
  const [isFront, setFront] = React.useState(true);
  const [recording, setRecording] = React.useState(false);
  const [recorder, setRecorder] = React.useState(null);

  const isError = !disabled && required && !gifVideo;

  const constraint = React.useMemo(
    () => ({
      audio: false,
      video: {
        // this causes error in firefox
        // facingMode: {
        //   exact: isFront ? 'user' : 'environment',
        // },
        facingMode: isFront ? 'user' : 'environment',

        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 400, ideal: 1080 },
      },
    }),
    [isFront]
  );

  const streamMediaHandler = React.useCallback((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);
    setOff(false);
    setSupported(true);
  }, []);

  const streamMediaErrorHandler = React.useCallback((e) => {
    console.log(e);
    if (e.name === 'NotAllowedError') {
      setOff(true);
    } else {
      setSupported(false);
    }
  }, []);

  const recordHandler = React.useCallback(
    (e) => {
      setRecording(true);
      const chunks = [];
      recorder.start();
      setTimeout(() => {
        recorder.stop();
      }, 1800);

      recorder.ondataavailable = function (ev) {
        chunks.push(ev.data);
      };
      recorder.onstop = (ev) => {
        let blob = new Blob(chunks, { type: 'video/mp4;' });

        setGifVideo(blob);

        setRecording(false);
        setRecorder(null);
      };
    },
    [recorder, setGifVideo]
  );

  const toggleCamera = React.useCallback(() => {
    setFront(!isFront);
  }, [isFront]);

  const clearGifVideo = React.useCallback(() => {
    setGifVideo(null);
  }, [setGifVideo]);

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
            <span className="pt1">
              {isFront ? 'front' : 'back'} camera is not supported
            </span>
          </div>
        )}
      </div>
      <hr className="mb5px" />

      <div className={css.recordBox}>
        <button
          disabled={!gifVideo || recording || !isSupported || isOff || disabled}
          onClick={clearGifVideo}
          className="buttonReset flexColCenter"
        >
          <ClearIcon fill="currentColor" title="clear" />
          <span className="fontSize11px mt5px">Discard</span>
        </button>
        <button
          disabled={
            !recorder ||
            recording ||
            gifVideo ||
            !isSupported ||
            isOff ||
            disabled
          }
          onClick={recordHandler}
          className={`${css.recordBtn} ${
            recording ? css.recording : css.notRecording
          }`}
        ></button>

        <button
          onClick={toggleCamera}
          className="buttonReset flexColCenter"
          disabled={disabled}
        >
          <FlipCameraIcon fill="currentColor" title="flip camera" />
          <span className="fontSize11px mt5px">Switch cam</span>
        </button>
      </div>
      {isError && (
        <div className={`${css.errorMsg} flexCenter`}>
          <span>*</span> <span>gif required</span>
        </div>
      )}
    </div>
  );
};

GifRecorder.propTypes = {
  setGifVideo: PropTypes.func.isRequired,
  gifVideo: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default GifRecorder;
