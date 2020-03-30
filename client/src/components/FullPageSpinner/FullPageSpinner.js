import React from 'react';
import Loader from 'react-loader-spinner';

import css from './FullPageSpinner.module.css';

export default function FullPageSpinner() {
  return (
    <div className={css.fullpageCenter}>
      <Loader type="Oval" className={css.spinner} color="currentColor" />
    </div>
  );
}
