import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';

import getPosts from '../../api/getPosts';
import { pageSize } from '../../config/env';
import PostContainer from '../../components/PostContainer/PostContainer';
import css from './Home.module.css';

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [curPage, setCurPage] = React.useState(0);
  const [hasMorePages, setHasMorePages] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const loadMoreHandler = React.useCallback(async () => {
    if (!loading) {
      setLoading(true);
      try {
        console.log('loadmore');
        console.log(curPage);
        const morePosts = await getPosts(curPage + 1);
        if (morePosts.length && morePosts.length === pageSize) {
          setPosts(posts => [...posts, ...morePosts]);
          setCurPage(curPage => curPage + 1);
        } else {
          setPosts(posts => [...posts, ...morePosts]);
          setCurPage(curPage => curPage + 1);
          setHasMorePages(false);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }, [curPage, loading]);

  if (posts.length === 0 && hasMorePages === false) {
    return <div>OMG! The wall is empty. Upload Your Jif Now!</div>;
  }

  return (
    <InfiniteScroll
      pageStart={curPage}
      hasMore={hasMorePages}
      loadMore={loadMoreHandler}
      loader={
        <div key="loader" className="flexCenter">
          <Loader type="Oval" className={css.spinner} color="currentColor" />
        </div>
      }
    >
      <div className="mt3 mb3">
        {posts.map(post => (
          <div key={post._id} className="mt3">
            <PostContainer post={post} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
