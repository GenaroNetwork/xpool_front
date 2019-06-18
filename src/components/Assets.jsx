import React from 'react';
import { Row, Col, Card, Button, Table, Modal } from 'antd';
import './Assets.css';
import * as Api from "../apis";

class Assets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      depositBalance:0.00,
      loanMiningBalance:0.00,
      incomeTotal:0.00,
      incomeBalance:0.00,
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  getDepositBalance = () => {
    const token = localStorage.getItem('xpool-token');
    Api.getDepositBalance(token).then(res => {
      if (res.data.code===200) {
        this.setState({
          depositBalance: res.data.data
        })
      }
    })

  };

  UserLoanMiningBalance = () => {
    const token = localStorage.getItem('xpool-token');
    Api.userLoanMiningBalance(token).then(res => {
      if (res.data.code===200) {
        this.setState({
          loanMiningBalance: res.data.data.Deposit
        })
      }
    })
  };

  ///income/income_total
  ///income/income_balance
  incomeTotal = () => {
    const token = localStorage.getItem('xpool-token');
    Api.incomeTotal(token).then(res => {
      if (res.data.code===200) {
        this.setState({
          incomeTotal: res.data.data
        })
      }
    })

  };

  incomeBalance = () => {
    const token = localStorage.getItem('xpool-token');
    Api.incomeBalance(token).then(res => {
      if (res.data.code===200) {
        this.setState({
          incomeBalance: res.data.data
        })
      }
    })
  };

  componentWillUpdate() {

  }

  componentWillMount(){
    this.getDepositBalance();
    this.UserLoanMiningBalance();
    this.incomeTotal();
    this.incomeBalance();
  }

  render() {
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];
    
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    return (
      <div>
        <Modal
          title="提现"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确认提现"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Row justify="space-around" type="flex">
          <Col md={6} sm={24} style={{padding: 10}}>
            <Card>
              <div className="header">
                <h2>保证金: <span style={{paddingLeft: 10 }}>{this.state.depositBalance}</span></h2>
              </div>
            </Card>
          </Col>
          <Col md={6} sm={24} style={{padding: 10, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>挖矿保证金: <span style={{paddingLeft: 10 }}>{this.state.loanMiningBalance}</span></h2>
              </div>
            </Card>
          </Col>

          <Col md={6} sm={24} style={{padding: 10, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>挖矿总收益: <span style={{paddingLeft: 10 }}>{this.state.incomeTotal}</span></h2>
              </div>
            </Card>
          </Col>
          <Col md={6} sm={24} style={{padding: 10, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>可提现收益: <span style={{paddingLeft: 10 }}>{this.state.incomeBalance}</span></h2>
                <Button type="primary" onClick={this.showModal}>提现</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{padding: 10}}>
            <h3>提现列表:</h3>
            <div style={{backgroundColor: '#FFFFFF', padding: 10}}>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Assets;