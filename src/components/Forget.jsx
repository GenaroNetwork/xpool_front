import React from 'react';
import { Form, Input, message, Icon, Row, Col, Button, } from 'antd';
import * as Api from '../apis';

class Forget extends React.Component {

  resetForm = () => {
    this.props.form.setFieldsValue({
      email: '',
      password: '',
      code: ''
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Api.forgetPassword(values.email, values.password, values.code).then(res => {
          switch (res.data.code) {
            case 200:
              this.resetForm();
              message.success('密码找回成功')
              break;
            default:
              this.resetForm();
              message.error(res.data.data)
              break;
          }
        })
      }
    })
  }

  getCode = () => {
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

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="xpool-user-register">
        <h1>找回密码</h1>
        <Form onSubmit={this.handleSubmit.bind(this)} className="xpool-user-register-form">
          <Form.Item>
            {
              getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入你的Email!' }]
              })(
                <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的新密码!' }]
              })(
                <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="新密码" type="password" />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('confirm', {
                rules: [{ required: true, message: '再次输入你的新密码!' }, { validator: this.compareToFirstPassword }]
              })(
                <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="确认新密码" type="password"/>
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
                <Button onClick={this.getCode}>获取验证码</Button>
              </Col>
            </Row>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              找回密码
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


export default Form.create({name: 'forget'})(Forget);