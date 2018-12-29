import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import './App.css';
import Private from './components/Private/Private.js'


class App extends Component {
  render() {
    return (
      <HashRouter>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/private' component={Private} exact />
      </Switch>
      </HashRouter>

    );
  }
}

export default App;
