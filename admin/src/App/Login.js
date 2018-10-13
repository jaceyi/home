import React from 'react';
import req from "../utils/request";
import {Redirect} from "react-router-dom";
import {Form, Icon, Input, Button, message} from 'antd';

class Login extends React.Component {
  render() {
    if (this.props.loginInfo) return <Redirect to={'/'}/>;
    return (
      <div className={'login'}>
        <Form className="login_form">
          <Form.Item>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item style={{margin: 0}}>
            <Button type="primary" onClick={() => this.handleClickLogin()} className="login_form_button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  handleClickLogin() {
    req.post('login')
      .then(
        res => {
          const {data} = res;
          message.success(`欢迎登录：${data.name}`, 1);
          this.props.setLoginInfo(data)
        }
      )
  }
}

export default Login;
