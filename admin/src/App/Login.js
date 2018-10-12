import React from 'react';
import req from "../utils/request";
import {Redirect} from "react-router-dom";
import {Button, message} from 'antd';

class Login extends React.Component {
  render() {
    if (this.props.loginInfo) return <Redirect to={'/'}/>;
    return (
      <div>
        <Button onClick={() => this.handleClickLogin()}>Login</Button>
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
