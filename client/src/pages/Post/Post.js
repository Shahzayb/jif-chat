import React from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import GifRecorder from '../../components/GifRecorder/GifRecorder';
import TextEditor from '../../components/TextEditor/TextEditor';
import { ReactComponent as SendIcon } from '../../assets/send.svg';
import css from './Post.module.css';
import uploadGif from '../../api/uploadGif';
import getSignature from '../../api/getSignature';
import getPublicSignature from '../../api/getPublicSignature';
import postTicket from '../../api/postTicket';
import useAuthState from '../../hooks/useAuthState';

function Post(props) {
  const { isAuthenticated } = useAuthState();
  const [gif, setGif] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [titleTouched, setTitleTouched] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const uploadHandler = React.useCallback(async () => {
    try {
      setUploading(true);
      let sig;
      if (isAuthenticated) {
        sig = await getSignature();
      } else {
        sig = await getPublicSignature();
      }

      const publicId = `${sig.folder}/${sig.public_id}`;
      await postTicket(publicId, title);
      await uploadGif(gif, sig);

      setTitle('');
      setGif(null);
      toast.success('Gif is uploaded successfully!');
    } catch (e) {
      toast.error('upload failed');
    } finally {
      setUploading(false);
      setTitleTouched(false);
    }
  }, [gif, title, isAuthenticated]);

  return (
    <div className={`${css.container} mt3 mhAuto`}>
      <h1 className={css.heading}>Make a Jif</h1>
      <GifRecorder
        required
        gifVideo={gif}
        setGifVideo={setGif}
        disabled={uploading}
      />
      <TextEditor
        error={!uploading && titleTouched && (!title || !title.trim())}
        required={true}
        disabled={uploading}
        onChange={setTitle}
        value={title}
        onBlur={() => {
          setTitleTouched(true);
        }}
      />
      <div>
        <button
          className="primaryBtn flexCenter mlAuto"
          onClick={uploadHandler}
          style={{ marginTop: '-2rem' }}
          disabled={uploading || !title || !title.trim() || !gif}
        >
          <span>Send</span>

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
}

export default Post;
