import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import NavMenu from './NavMenu';
import Main from './Main';

function Index(props) {
  const {
    userInfo
  } = props;

  if (!userInfo) return <Redirect to={`/login`}/>;
  return (
    <Layout className={'container'}>
      <NavMenu/>
      <Layout>
        <Layout.Header className={'container_header'}>
          Hello {userInfo.username}!
        </Layout.Header>
        <Layout.Content className={'container_main'}>
          <Main/>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

function mapStateToProps(state) {
  const {
    userInfo
  } = state;

  return {
    userInfo
  }
}


export default connect(mapStateToProps)(withRouter(Index));
