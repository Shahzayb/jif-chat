import React from 'react';
import GoogleLogin from 'react-google-login';
import useAuthState from '../../hooks/useAuthState';

export default function Login() {
  const { login, logout } = useAuthState();

  return (
    <div className="pFixCenter">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login With Google"
        responseType="code"
        /**
         * To get access_token and refresh_token in server side,
         * the data for redirect_uri should be postmessage.
         * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
         */
        redirectUri="postmessage"
        onSuccess={login}
        onFailure={logout}
        theme="dark"
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}
