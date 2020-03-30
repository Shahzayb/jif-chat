import React from 'react';
import Loader from 'react-loader-spinner';

import css from './FullPageSpinner.module.css';

const fullpageCenter = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default function FullPageSpinner() {
  return (
    <div style={fullpageCenter}>
      <Loader type="Oval" className={css.spinner} color="currentColor" />
    </div>
  );
}
