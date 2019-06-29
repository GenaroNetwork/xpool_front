import React from 'react';
import { Form, Input, Icon, Button, Modal, message} from 'antd';
import * as Api from '../apis';

class StartMineForm extends React.Component {
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
      value: ''
    })
  }

  resetLoading = () => {
    this.setState({
      confirmLoading: !this.state.confirmLoading
    })
  }

  handleLoanMining = () => {
    const token = localStorage.getItem('xpool-token');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
          visible: true,
        })
        Api.loanMining(token, values.value, values.password).then(res => {
          switch (res.data.code) {
            case 200:
              this.setState({
                visible: false,
                confirmLoading: false,
              });
              this.resetForm();
              message.info(res.data.data);
              this.props.onComplete();
              break;
            default:
              this.resetForm();
              this.resetLoading();
              message.error(res.data.data);
              break;
          }
        })
      }
    });
    
  }


  resetForm = () => {
    this.props.form.setFieldsValue({
      value: '',
      password: ''
    })
  }

  handleCancelLoanMining = () => {
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
        <Button type="primary" onClick={this.addDeposit}>申请挖矿</Button>
        <Modal
          title="申请挖矿"
          visible={this.state.visible}
          onOk={this.handleLoanMining}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancelLoanMining}
          cancelText="取消"
          okText="确认申请挖矿"
        >
          <Form className="xpool-user-register-form">
            <Form.Item>
              {
                getFieldDecorator('value', {
                  rules: [{ required: true, message: '请输入挖矿保证金!' }]
                })(
                  <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="挖矿保证金" />
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

export default Form.create({ name: 'mine_form' })(StartMineForm);