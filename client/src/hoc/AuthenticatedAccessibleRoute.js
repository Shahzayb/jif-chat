import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import useAuthState from '../hooks/useAuthState';

const AuthenticatedAccessibleRoute = props => {
  const { isAuthenticated } = useAuthState();
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push(`/login?next=${history.location.pathname}`);
    }
  }, [isAuthenticated, history]);

  return isAuthenticated ? <Route {...props} /> : null;
};

export default AuthenticatedAccessibleRoute;
