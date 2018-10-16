import React from 'react';
import {Switch, Route} from 'react-router-dom';
import mainRouter from '../routers/mainRouter';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        {
          mainRouter.map(item => {
            if (item.children) {
              return item.children.map(item => (
                <Route exact key={item.path} path={item.path} component={item.component}/>
              ))
            } else {
              return <Route exact key={item.path} path={item.path} component={item.component}/>
            }
          })
        }
      </Switch>
    )
  }
}

export default Main;
