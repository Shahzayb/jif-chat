import React from 'react';
import GifRecorder from '../../components/GifRecorder/GifRecorder';
import TextEditor from '../../components/TextEditor/TextEditor';
import { ReactComponent as SendIcon } from '../../assets/send.svg';
import css from './Post.module.css';

const Post = props => {
  const [gif, setGif] = React.useState(null);
  const [text, setText] = React.useState('');

  const uploadHandler = React.useCallback(() => {
    const data = new FormData();
    data.append('gif', gif);
    data.append('title', text);
    fetch('http://localhost:5000/api/post', {
      method: 'POST',
      body: data
    })
      .then(console.log)
      .catch(console.log);
  }, [gif, text]);

  return (
    <div className={`${css.postContainer} mt3 mhAuto`}>
      <h1 className={css.heading}>Make a Post</h1>
      <GifRecorder onRecordSuccess={setGif} />
      <TextEditor onChange={setText} value={text} />
      <div>
        <button
          className="primaryBtn flexCenter"
          onClick={uploadHandler}
          style={{ marginLeft: 'auto', marginTop: '-2rem' }}
        >
          Send <SendIcon fill="#fff" className={css.sendIcon} />
        </button>
      </div>
    </div>
  );
};

export default Post;
