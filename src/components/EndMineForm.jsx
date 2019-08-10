import React from 'react';
import { Form, Input, Icon, Modal, Button, message } from 'antd';
import * as Api from '../apis';

class EndMineForm extends React.Component {
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
        });
        Api.extractloanmining(token, values.password).then(res => {
          switch (res.data.code) {
            case 200:
              this.setState({
                visible: false,
                confirmLoading: false,
              });
              this.resetForm();
              message.info(res.data.data)
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
        <Button type="primary" onClick={this.withdrawDeposit}>申请结束挖矿</Button>
        <Modal
          title="申请结束挖矿"
          visible={this.state.visible}
          onOk={this.handleWithdraw}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancelWithdraw}
          cancelText="取消"
          okText="确认结束挖矿"
        >
          <Form className="xpool-user-register-form">
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

export default Form.create({ name: 'mine_form' })(EndMineForm);