import React from 'react';
import { Form, Input, message, Icon, Button, } from 'antd';
import * as Api from '../apis';

class Reset extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const token = localStorage.getItem('xpool-token');
      if (!err) {
        Api.resetPassword(token, values.password, values.newPassword).then(res => {
          switch (res.data.code) {
            case 200:
              this.resetForm()
              this.props.history.push('/login')
              message.success('重置密码成功,请重新登陆')
              break;
            case 10030:
              this.resetForm()
              message.error('密码长度应大于5位!')
              break
            case 10032:
              this.props.history.push('/login')
              break;
            case 10033:
              this.resetForm()
              message.error('原密码无效!')
              break;
            default:
              break;
          }
        })
      }
    });
  }

  resetForm() {
    this.props.form.setFieldsValue({
      password: '',
      newPassword: '',
      confirm: ''
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form; 
    return(
      <div className="xpool-user-register">
        <h1>重置密码</h1>
        <Form onSubmit={this.handleSubmit.bind(this)} className="xpool-user-register-form">
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的旧密码!' }]
              })(
                <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="旧密码" type="password"/>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入你的新密码!' }]
              })(
                <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="新密码" type="password"/>
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              重置密码
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({name: 'reset'})(Reset);