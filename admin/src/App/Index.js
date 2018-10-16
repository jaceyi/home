import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import NavMenu from './NavMenu';
import Main from './Main';

class Index extends React.Component {
  render() {
    const {
      userInfo
    } = this.props;

    if (!userInfo) return <Redirect to={'/login'}/>;
    return (
      <Layout className={'container'}>
        <NavMenu/>
        <Layout>
          <Layout.Header className={'container_header'}>Hello {userInfo.name}!</Layout.Header>
          <Layout.Content>
            <Main/>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const {
    userInfo
  } = state;

  return {
    userInfo
  }
}
export default connect(mapStateToProps)(Index);