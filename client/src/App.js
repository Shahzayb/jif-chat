import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import PostPage from './pages/Post/Post';

function App() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Switch>
          <Route exact path="/" component={() => <div>home</div>} />
          <Route path="/post" component={PostPage} />
          <Route path="/login" component={() => <div>login</div>} />
          <Route path="/logout" component={() => <div>logout</div>} />
        </Switch>
      </div>
    </>
  );
}

export default App;
