import React from 'react';
import req from './utils/request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }

  componentWillMount() {
    req.get('getUserInfo')
      .then(
        res => {
          this.setState({
            userInfo: res.data
          })
        }
      )
  }

  render() {
    const {
      userInfo
    } = this.state;

    return (
      <div>Hello {userInfo.name}!</div>
    )
  }
}

export default App;
