import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import PostPage from './pages/Post/Post';
import LoginPage from './pages/Login/Login';
import HomePage from './pages/Home/Home';

import UnauthenticatedAccessibleRoute from './hoc/UnauthenticatedAccessibleRoute';

function App() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/post" component={PostPage} />
          <UnauthenticatedAccessibleRoute
            exact
            path="/login"
            component={LoginPage}
          />
          <UnauthenticatedAccessibleRoute
            exact
            path="/logout"
            component={() => <div>logout</div>}
          />
        </Switch>
      </div>
    </>
  );
}

export default App;
