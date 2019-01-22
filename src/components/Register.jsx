import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';
import './Register.css';
import * as Api from '../apis';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      code: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  getCode() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    if (this.state.email) {
      Api.getCode(this.state.email);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form; 
    return(
      <div className="xpool-user-register">
        <h1>用户注册</h1>
        <Form onSubmit={this.handleSubmit.bind(this) } className="xpool-user-register-form">
          <Form.Item>
            {
              getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入你的Email!' }]
              })(
                <Input prefix={<Icon type="wallet" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入你的钱包地址!' }]
              })(
                <Input prefix={<Icon type="contacts" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Address"/>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码!' }]
              })(
                <Input prefix={<Icon type="safety" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Password"/>
              )
            }
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: '请输入你的验证码!' }],
                })(
                  <Input prefix={<Icon type="fire" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="验证码"/>
                )}
              </Col>
              <Col span={12}>
                <Button onClick={this.getCode.bind(this)}>获取验证码</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({name: 'xpool-user-register'})(Register);