import React from 'react';
import req from "../utils/request";
import {Redirect} from "react-router-dom";
import {Form, Icon, Input, Button, message} from 'antd';

class Login extends React.Component {
  componentDidMount() {
    this.handleClickLogin()
  }

  render() {
    if (this.props.loginInfo) return <Redirect to={'/'}/>;
    const iconStyle = {
      color: 'rgba(0,0,0,.25)'
    };
    const {getFieldDecorator} = this.props.form;

    return (
      <div className={'login'}>
        <Form className="login_form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: 'Jace'
            })(
              <Input
                prefix={<Icon type="user" style={iconStyle}/>}
                placeholder="Username"/>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: '000000'
            })(
              <Input
                prefix={<Icon type="lock" style={iconStyle}/>}
                type="password"
                placeholder="Password"/>
            )}
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        req.post('login', values)
          .then(
            res => {
              const {data} = res;
              message.success(`欢迎登录：${data.name}`, 1);
              this.props.setLoginInfo(data)
            }
          )
        }
      });
  }
}

const WrappedNormalLogin = Form.create()(Login);
export default WrappedNormalLogin;
