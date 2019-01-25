import React from 'react';
import { Form, Input, message, Icon, Button, } from 'antd';
import { Link } from 'react-router-dom';
import * as Api from '../apis';
import './Login.css';

class Login extends React.Component {

  login(token) {
    localStorage.setItem('xpool-token', token)
    this.props.onLogin();
    this.props.history.push('/')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Api.login(values.email, values.password).then(res => {
          const data = res.data;
          switch (data.code) {
            case 200:
              this.login(data.data.TokenRes)
              break;
            default:
              message.error(res.data.data)
              break;
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form; 
    return (
      <div className="xpool-user-register">
        <h1>用户登录</h1>
        <Form onSubmit={this.handleSubmit.bind(this)} className="xpool-user-register-form">
          <Form.Item>
            {
              getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入你的Email!' }]
              })(
                <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码!' }]
              })(
                <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" type="password"/>
              )
            }
          </Form.Item>
          <Form.Item>
            <Link className="login-form-forgot" to="forget">忘记密码?</Link>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            Or <Link to="/register">立即注册!</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({name: 'xpool-user-login'})(Login)