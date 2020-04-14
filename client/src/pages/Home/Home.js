import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import getPosts from '../../api/getPosts';
import { pageSize } from '../../config/env';
import JifContainer from '../../components/JifContainer/JifContainer';
import NoContent from '../../components/NoContent/NoContent';
import css from './Home.module.css';

export default function Home() {
  const [newPosts, setNewPosts] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [hasMorePages, setHasMorePages] = React.useState(true);
  const [isError, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const eventSourceRef = React.useRef(null);

  const afterId = posts[posts.length - 1] && posts[posts.length - 1]._id;
  const baseId = posts[0] && posts[0]._id;

  const mergeNewPosts = React.useCallback(() => {
    setPosts((posts) => [...newPosts, ...posts]);
    setNewPosts([]);
  }, [newPosts]);

  React.useEffect(() => {
    if (baseId) {
      eventSourceRef.current = new EventSource(
        `/api/post/events?base_id=${baseId}`
      );

      eventSourceRef.current.onopen = (...rest) => {};

      eventSourceRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.action === 'insert') {
          setNewPosts((posts) => [data.payload, ...posts]);
        } else if (data.action === 'delete') {
          setNewPosts((posts) => {
            return posts.filter((post) => post._id !== data.payload._id);
          });
        }
      };

      eventSourceRef.current.onerror = (...rest) => {};
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [eventSourceRef, baseId]);

  const deleteSuccessHandler = React.useCallback((postId) => {
    setPosts((posts) => {
      return posts.filter((post) => post._id !== postId);
    });
  }, []);

  const loadMoreHandler = React.useCallback(async () => {
    if (!loading) {
      setLoading(true);
      try {
        const morePosts = await getPosts(afterId);
        setPosts((posts) => [...posts, ...morePosts]);

        if (morePosts.length !== pageSize) {
          setHasMorePages(false);
        }
      } catch (e) {
        setError(true);
        toast.error('Network Error: failed to fetch jifs');
      } finally {
        setLoading(false);
      }
    }
  }, [loading, afterId]);

  if (posts.length === 0 && hasMorePages === false) {
    return <NoContent />;
  }

  return (
    <>
      {!!newPosts.length && (
        <div className="flexCenter mt3">
          <button className="primaryBtn" onClick={mergeNewPosts}>
            {newPosts.length} new posts
          </button>
        </div>
      )}
      <InfiniteScroll
        pageStart={0}
        hasMore={hasMorePages && !isError}
        loadMore={loadMoreHandler}
        loader={
          <div key="loader" className="flexCenter">
            <Loader type="Oval" className={css.spinner} color="currentColor" />
          </div>
        }
      >
        <div className="mt3 mb3">
          {posts.map((post) => (
            <div key={post._id} className="mt3">
              <JifContainer
                post={post}
                onDeleteSuccess={deleteSuccessHandler}
              />
            </div>
          ))}
          {isError && (
            <div className="flexCenter mt3">
              <button className="primaryBtn" onClick={() => setError(false)}>
                Retry
              </button>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
}
