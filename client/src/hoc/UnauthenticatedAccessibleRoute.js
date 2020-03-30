import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import useAuthState from '../hooks/useAuthState';

const UnauthenticatedAccessibleRoute = props => {
  const { isAuthenticated } = useAuthState();
  const history = useHistory();

  React.useEffect(() => {
    if (isAuthenticated) {
      var paramsString = history.location.search;
      var searchParams = new URLSearchParams(paramsString);

      if (searchParams.has('next')) {
        const next = searchParams.get('next');
        history.replace(next);
      } else {
        history.replace(`/`);
      }
    }
  }, [isAuthenticated, history]);

  return !isAuthenticated ? <Route {...props} /> : null;
};

export default UnauthenticatedAccessibleRoute;
