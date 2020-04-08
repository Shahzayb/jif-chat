import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import getPosts from '../../api/getPosts';
import { pageSize } from '../../config/env';
import JifContainer from '../../components/JifContainer/JifContainer';
import css from './Home.module.css';

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [afterId, setAfterId] = React.useState(0);
  const [hasMorePages, setHasMorePages] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const deleteSuccessHandler = React.useCallback((postId) => {
    setPosts((posts) => {
      return posts.filter((post) => post._id !== postId);
    });
  }, []);

  const loadMoreHandler = React.useCallback(async () => {
    if (!loading) {
      setLoading(true);
      try {
        console.log('loadmore', afterId);
        const morePosts = await getPosts(afterId);
        setPosts((posts) => [...posts, ...morePosts]);

        if (morePosts.length === pageSize) {
          setAfterId(morePosts[pageSize - 1]._id);
        } else {
          if (morePosts.length) {
            setAfterId(morePosts[morePosts.length - 1]._id);
          }
          setHasMorePages(false);
        }
      } catch (e) {
        console.log(e);
        setError(true);
        toast.error('Network Error: failed to fetch jifs');
      } finally {
        setLoading(false);
      }
    }
  }, [afterId, loading]);

  if (posts.length === 0 && hasMorePages === false) {
    return <div>OMG! The wall is empty. Upload Your Jif Now!</div>;
  }

  return (
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
            <JifContainer post={post} onDeleteSuccess={deleteSuccessHandler} />
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
  );
}
