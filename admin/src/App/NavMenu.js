import React from 'react';
import {Menu, Layout} from 'antd';
import {Link} from 'react-router-dom';

class NavMenu extends React.Component {
  render() {
    return (
      <Layout.Sider className={'container_sider'}>
        <div className={'container_sider_header'}>
          <img className={'container_sider_icon'} src="/public/images/yi.png" alt=""/>
          <span>admin</span>
        </div>
        <Menu className={'container_sider_menu'} mode={'inline'}>
          <Menu.Item key={'1'}>
            <Link to={'/DataEditing'}>资料编辑</Link>
          </Menu.Item>
          <Menu.SubMenu key={'2'} title={'Blog管理'}>
            <Menu.Item key={'2-1'}>
              文章管理
            </Menu.Item>
            <Menu.Item key={'2-2'}>
              留言管理
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key={'3'} title={'静态资源'}>
            <Menu.Item key={'3-1'}>
              页面管理
            </Menu.Item>
            <Menu.Item key={'3-2'}>
              文件管理
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={'4'}>
            API管理
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    )
  }
}

export default NavMenu;
