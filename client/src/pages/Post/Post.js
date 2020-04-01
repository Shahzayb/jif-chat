import React from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import GifRecorder from '../../components/GifRecorder/GifRecorder';
import TextEditor from '../../components/TextEditor/TextEditor';
import { ReactComponent as SendIcon } from '../../assets/send.svg';
import css from './Post.module.css';
import uploadGif from '../../api/uploadGif';
import getSignature from '../../api/getSignature';

const Post = props => {
  const [gif, setGif] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const uploadHandler = React.useCallback(async () => {
    try {
      setUploading(true);
      const sig = await getSignature(title);
      const res = await uploadGif(gif, sig);
      console.log(res);
      setTitle('');
      setGif(null);
      toast.success('Gif is uploaded successfully!');
    } catch (e) {
      console.log(e);
      toast.error('upload failed');
    } finally {
      setUploading(false);
    }
  }, [gif, title]);

  return (
    <div className={`${css.postContainer} mt3 mhAuto`}>
      <h1 className={css.heading}>Make a Post</h1>
      <GifRecorder onRecordSuccess={setGif} disabled={uploading} />
      <TextEditor disabled={uploading} onChange={setTitle} value={title} />
      <div>
        <button
          className="primaryBtn flexCenter mlAuto"
          onClick={uploadHandler}
          style={{ marginTop: '-2rem' }}
          disabled={uploading || !title || !gif}
        >
          <spna>Send</spna>

          {uploading ? (
            <Loader
              type="Oval"
              className={`${css.spinner} ml1 flexCenter`}
              color="currentColor"
            />
          ) : (
            <SendIcon fill="currentColor" className="ml1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Post;
