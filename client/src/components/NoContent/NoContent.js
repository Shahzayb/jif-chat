import React from 'react';
import { Link } from 'react-router-dom';
import css from './NoContent.module.css';

export default function NoContent() {
  return (
    <div className={css.center}>
      <div className={css.flexCol}>
        <div>
          <img
            src="https://res.cloudinary.com/shahzayb/image/upload/w_100,q_auto,dpr_auto,f_auto/v1586782806/jifchat/xmarmlo86dpfv3i3rgdn"
            alt="No Content Found"
          ></img>
        </div>
        <div className="mt3 textCenter">
          No content found! <Link to="/post">Make a jif</Link> to share with the
          world.
        </div>
      </div>
    </div>
  );
}
