import React from 'react';
import {Redirect} from 'react-router-dom';
import {Layout, Menu} from 'antd';

const {Header, Sider, Content} = Layout;

class Index extends React.Component {
  render() {
    const {
      loginInfo
    } = this.props;

    if (!loginInfo) return <Redirect to={'/login'}/>;
    return (
      <Layout className={'container'}>
        <Sider className={'container_sider'}>
          <Menu className={'container_sider_menu'}>
            <Menu.Item key="1">
              Menu1
            </Menu.Item>
            <Menu.Item key="2">
              Menu2
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={'container_header'}>Hello {loginInfo.name}!</Header>
          <Content>
            Content
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Index;
