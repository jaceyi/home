import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Index from '../App/Index';
import Login from './Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={'/login'} component={Login}/>
        <Route path={'/'} component={Index}/>
      </Switch>
    )
  }
}

export default App;
