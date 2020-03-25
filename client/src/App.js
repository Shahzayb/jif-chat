import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Switch>
          <Route exact path="/" component={() => <div>home</div>} />
          <Route path="/post" component={() => <div>post</div>} />
          <Route path="/login" component={() => <div>login</div>} />
          <Route path="/logout" component={() => <div>logout</div>} />
        </Switch>
      </div>
    </>
  );
}

export default App;
