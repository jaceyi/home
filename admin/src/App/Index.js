import React from 'react';
import {Redirect} from 'react-router-dom';

class Index extends React.Component {
  render() {
    const {
      loginInfo
    } = this.props;

    if (!loginInfo) return <Redirect to={'/login'}/>;
    return (
      <div>
        Hello {loginInfo.name}!
      </div>
    )
  }
}

export default Index;
