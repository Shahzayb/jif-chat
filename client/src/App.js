import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="layout">
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={() => <div>home</div>} />
        <Route path="/post" component={() => <div>post</div>} />
        <Route path="/login" component={() => <div>login</div>} />
        <Route path="/logout" component={() => <div>logout</div>} />
      </Switch>
    </div>
  );
}

export default App;
