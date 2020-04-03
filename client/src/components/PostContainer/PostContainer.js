import React from 'react';

import useAuthState from '../../hooks/useAuthState';
import css from './PostContainer.module.css';

export default function PostContainer({ post }) {
  const {
    user: { _id: id },
  } = useAuthState();
  const isMine = id === post.user._id;
  return (
    <div className={`${css.container} mhAuto`}>
      <header className="flexBtw mb1">
        <div className="flexCenter">
          <img
            className="rounded w4"
            src={post.user.profilePic}
            alt={post.user.lastName}
          ></img>
          <span className="ml1">{post.user.firstName}</span>
        </div>
        {isMine && <button className="primaryBtn">delete</button>}
      </header>
      <hr className="mb1" />
      <div className={css.videoContainer}>
        <video
          className="video"
          src={post.gifSrc}
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </div>
      <div className="p1">{post.title}</div>
    </div>
  );
}
