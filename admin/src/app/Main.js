import React from 'react';
import {Switch, Route} from 'react-router-dom';
import mainRouter from '../routers/mainRouter';
import NotPage from "./NotPage";

function Main() {
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
      <Route component={NotPage}/>
    </Switch>
  )
}

export default Main;
