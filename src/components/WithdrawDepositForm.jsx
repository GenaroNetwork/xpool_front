import React from 'react';
import { Form, Input, Icon, Modal, Button, message } from 'antd';
import * as Api from '../apis';

class WithdrawDepositForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false
    }
  }

  resetForm = () => {
    this.props.form.setFieldsValue({
      value: '',
      password: ''
    })
  }

  resetLoading = () => {
    this.setState({
      confirmLoading: !this.state.confirmLoading
    })
  }

  handleWithdraw = () => {
    const token = localStorage.getItem('xpool-token');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
          visible: true,
        })
        Api.extractDeposit(token, values.password, values.value).then(res => {
          switch (res.data.code) {
            case 200:
              this.setState({
                visible: false,
                confirmLoading: false,
              });
              this.resetForm();
              this.props.onComplete();
              message.info('申请提取保证金成功')
              break;
            default:
              this.resetForm();
              this.resetLoading();
              message.error(res.data.data)
              break;
          }
        })
      }
    });
  }

  handleCancelWithdraw = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    })
  }

  withdrawDeposit = () => {
    this.setState({
      visible: true,
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.withdrawDeposit}>申请提现保证金</Button>
        <Modal
          title="申请提现保证金"
          visible={this.state.visible}
          onOk={this.handleWithdraw}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancelWithdraw}
          cancelText="取消"
          okText="确认提现保证金"
        >
          <Form className="xpool-user-register-form">
            <Form.Item>
              {
                getFieldDecorator('value', {
                  rules: [{ required: true, message: '请输入你的提取金额!' }]
                })(
                  <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="提取金额" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入你的密码!' }]
                })(
                  <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" type="password"/>
                )
              }
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'withdraw_deposit_form' })(WithdrawDepositForm);