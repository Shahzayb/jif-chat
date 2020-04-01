import React from 'react';
import { toast } from 'react-toastify';

import AuthContext from '../context/AuthContext';
import getMyProfile from '../api/getMyProfile';
import googleOAuth from '../api/googleOAuth';
import FullPageSpinner from '../components/FullPageSpinner/FullPageSpinner';

const initState = {
  loading: true,
  user: null,
  token: null
};

export default function AuthProvider({ children }) {
  const [state, setState] = React.useState(initState);

  // get user profile on startup
  React.useEffect(() => {
    setState(state => ({ ...state, loading: true }));
    const token = localStorage.getItem('token');

    if (token) {
      getMyProfile(token)
        .then(user => {
          setState(state => ({ ...state, user, token }));
        })
        .catch(e => {
          console.log(e);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setState(state => ({ ...state, loading: false }));
        });
    } else {
      setState(state => ({ ...state, loading: false }));
    }
  }, []);

  const login = React.useCallback(async auth => {
    setState(state => ({ ...state, loading: true }));
    try {
      if (!auth && !auth.code) {
        throw new Error('code not found');
      }
      const { user, token } = await googleOAuth(auth);
      localStorage.setItem('token', token);
      setState(state => ({ ...state, user, token }));
    } catch (e) {
      console.log(e);
      toast.error('Failed to login');
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  }, []);

  const logout = React.useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setState(state => ({ ...state, loading: true }));
      localStorage.removeItem('token');
      setState({ ...initState, loading: false });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {state.loading ? <FullPageSpinner /> : children}
    </AuthContext.Provider>
  );
}
