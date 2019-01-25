import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, message, Icon, Row, Col, Button, } from 'antd';
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

  delayRedirect(ms) {
    const that = this;
    setTimeout(function() {
      that.props.history.push('/login')
    }, ms)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Api.register(values.email, values.password, values.code, values.address).then(res => {
          const data = res.data;
          switch (data.code) {
            case 200:
              message.success('注册用户成功');
              this.delayRedirect(2000);
              break;
            default:
              message.success(res.data.data);
              break;
          }
        })
      }
    });
  }

  getCode() {
    const data = this.props.form.getFieldsValue();
    if (data.email) {
      Api.getCode(data.email).then((res) => {
        console.log(res.data.code)
        switch (res.data.code) {
          case 200:
            message.info('邮件发送成功');
            break;
          default:
            message.error(res.data.data);
            break;          
        }
      }).catch(err => {
        message.error('邮件发送失败');
      });
    }else {
      message.error('请输入邮箱');
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
                <Input prefix={<Icon type="safety" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Password" type="password"/>
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
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create({name: 'xpool-user-register'})(Register));