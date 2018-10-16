import React from 'react';
import {Switch, Route} from 'react-router-dom';
import DataEditing from '../components/DataEditing/DataEditing'

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={'/DataEditing'} component={DataEditing}/>
      </Switch>
    )
  }
}

export default Main;
