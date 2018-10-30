import React from 'react';
import {Switch, Route} from 'react-router-dom';
import baseRouter from '../routers/baseRouter';

class App extends React.Component {
  render() {
    return (
      <Switch>
        {
          baseRouter.map(item => (
            <Route key={item.path} path={item.path} component={item.component}/>
          ))
        }
      </Switch>
    )
  }
}

export default App;
