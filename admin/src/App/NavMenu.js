import React from 'react';
import {Menu, Layout} from 'antd';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import mainRouter from '../routers/mainRouter';

class NavMenu extends React.Component {
  render() {
    return (
      <Layout.Sider className={'container_sider'}>
        <div className={'container_sider_header'}>
          <img className={'container_sider_icon'} src="/public/images/yi.png" alt=""/>
          <span>admin</span>
        </div>
        <Menu 
          className={'container_sider_menu'} 
          mode={'inline'} 
          selectedKeys={[this.props.location.pathname]}>
          {
            mainRouter.map((item, index) => {
              if (item.children) {
                return (
                  <Menu.SubMenu key={index} title={item.title}>
                    {
                      item.children.map(item => (
                        <Menu.Item key={item.path}>
                          <Link to={item.path}>{item.name}</Link>
                        </Menu.Item>
                      ))
                    }
                  </Menu.SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(NavMenu);
