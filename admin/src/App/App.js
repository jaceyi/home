import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Index from '../App/Index';
import Login from './Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: null
    }
  }

  render() {
    const {
      loginInfo
    } = this.state;

    return (
      <Switch>
        <Route exact path={'/'}>
          <Index loginInfo={loginInfo}/>
        </Route>
        <Route exact path={'/login'}>
          <Login
            loginInfo={loginInfo}
            setLoginInfo={info => this.setLoginInfo(info)}/>
        </Route>
      </Switch>
    )
  }

  setLoginInfo(info) {
    this.setState({
      loginInfo: info
    })
  }
}

export default App;
