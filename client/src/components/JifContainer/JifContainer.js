import React from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import useAuthState from '../../hooks/useAuthState';
import css from './JifContainer.module.css';
import deletePost from '../../api/deletePost';

export default function JifContainer({ post, onDeleteSuccess }) {
  const { user } = useAuthState();
  const [deleting, setDeleting] = React.useState(false);
  const isMine = user && user._id === post.user._id;
  const postId = post._id;

  const deleteHandler = React.useCallback(async () => {
    try {
      setDeleting(true);
      await deletePost(postId);
      onDeleteSuccess(postId);
    } catch (e) {
      toast.error('failed to delete post. try again later.');
    } finally {
      setDeleting(false);
    }
  }, [onDeleteSuccess, postId]);
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
        {isMine && (
          <button
            disabled={deleting}
            onClick={deleteHandler}
            className="primaryBtn flexCenter"
          >
            <span>delete</span>
            {deleting && (
              <Loader
                type="Oval"
                className={`${css.spinner} ml1 flexCenter`}
                color="currentColor"
              />
            )}
          </button>
        )}
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
