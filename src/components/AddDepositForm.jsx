import React from 'react';
import { Form, Input, Icon, Button, Modal, message} from 'antd';
import * as Api from '../apis';

class AddDepositForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
    }
  }

  

  resetForm = () => {
    this.props.form.setFieldsValue({
      password: '',
      hash: ''
    })
  }

  resetLoading = () => {
    this.setState({
      confirmLoading: !this.state.confirmLoading
    })
  }

  handleAdddeposit = () => {
    const token = localStorage.getItem('xpool-token');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
          visible: true,
        })
        Api.addDesposit(token, values.hash, values.password).then(res => {
          switch (res.data.code) {
            case 200:
              this.setState({
                visible: false,
                confirmLoading: false,
              });
              this.resetForm();
              message.info('申请提取保证金成功')
              this.props.onComplete();
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


  resetForm = () => {
    this.props.form.setFieldsValue({
      hash: '',
      password: ''
    })
  }

  handleCancelAdddeposit = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    })
  }

  addDeposit = () => {
    this.setState({
      visible: true,
      confirmLoading: false
    }) 
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.addDeposit}>申请增加保证金</Button>
        <Modal
          title="申请增加保证金"
          visible={this.state.visible}
          onOk={this.handleAdddeposit}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancelAdddeposit}
          cancelText="取消"
          okText="确认增加保证金"
        >
          <Form className="xpool-user-register-form">
            <Form.Item>
              {
                getFieldDecorator('hash', {
                  rules: [{ required: true, message: '请输入你的交易Hash!' }]
                })(
                  <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="交易哈希" />
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

export default Form.create({ name: 'withdraw_deposit_form' })(AddDepositForm);