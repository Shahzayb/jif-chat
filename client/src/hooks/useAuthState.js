import React from 'react';

import AuthContext from '../context/AuthContext';

export default function useAuthState() {
  const state = React.useContext(AuthContext);

  const isAuthenticated = !!state.user && !state.loading;
  return {
    ...state,
    isAuthenticated
  };
}
