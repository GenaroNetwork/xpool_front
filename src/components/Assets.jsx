import React from 'react';
import {Row, Col, Card, Button, Table, Modal, Form, Input, Icon, message, Pagination} from 'antd';
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
      value:0.00,
      pass:"",
      getdepositlist: {
        page: 1,
        pageSize: 5,
        data: [],
        total: 0
      },
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  getValue = (value)=>{
    this.setState({
      value:value.target.value,
    });
  }

  getPass = (value)=>{
    this.setState({
      pass:value.target.value,
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    const token = localStorage.getItem('xpool-token');
    Api.extract_income_balance(token,this.state.value,this.state.pass).then(res => {
      if (res.data.code===200) {
        this.setState({
          visible: false,
          confirmLoading:false,
        });
        this.incomeBalance();
        return message.success(res.data.data)
      }else{
        return message.error(res.data.data)
      }
    })
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

  onHandleChangeDepositlistTable = (page, pageSize) => {
    this.getDepositlist(page, pageSize);
  }

  getDepositlist = (page, pageSize) => {
    const token = localStorage.getItem('xpool-token');
    Api.extract_income_list(token, page, pageSize).then(res => {
      if (res.data.code) {
        this.setState(preState => ({
          getdepositlist: Object.assign({}, preState.getdepositlist, {
            page: res.data.data.page,
            pageSize: res.data.data.pageSize,
            total: res.data.data.total,
            data: res.data.data.extract_income
          })
        }))
      }
    })
  }

  componentWillUpdate() {

  }

  componentWillMount(){
    this.getDepositBalance();
    this.UserLoanMiningBalance();
    this.incomeTotal();
    this.incomeBalance();
    this.getDepositlist(this.state.getdepositlist.page, this.state.getdepositlist.pageSize);
  }

  render() {
    const footer_getdepositlist = () => (
        <Pagination total={this.state.getdepositlist.total} current={this.state.getdepositlist.page} pageSize={this.state.getdepositlist.pageSize} hideOnSinglePage={true} onChange={this.onHandleChangeDepositlistTable}/>
    )
    const columns_getdepositlist = [{
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    }, {
      title: 'Email',
      dataIndex: 'Email',
    },{
      title: 'Value',
      dataIndex: 'Value',
    },{
      title: '审核状态',
      dataIndex: 'State',
      render: (text) => {
        switch (text) {
          case 1:
            return ( <span>待审核</span> )
          case 3:
            return ( <span>审核通过</span> )
          case 5:
            return ( <span>审核拒绝</span> )
          default:
            break;
        }
      }
    },{
      title: '审核失败原因',
      dataIndex: 'Reason',
      render: (text) => (
          <span style={{color: '#EF1234'}}>{text}</span>
      )
    },{
      title: '申请添加时间',
      dataIndex: 'CreatedAt',
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
          <Form className="">
            <Form.Item>
                <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={(value)=>this.getValue(value)} placeholder="提取金额" />
            </Form.Item>
            <Form.Item>
              <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={(value)=>this.getPass(value)} placeholder="密码" type="password"/>
            </Form.Item>
          </Form>
        </Modal>
        <Row justify="space-around" type="flex">
          <Col md={6} sm={24} style={{padding: 1}}>
            <Card>
              <div className="header">
                <h2>保证金余额: <span style={{paddingLeft: 1 }}>{this.state.depositBalance}</span></h2>
              </div>
            </Card>
          </Col>
          <Col md={6} sm={24} style={{padding: 1, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>挖矿保证金: <span style={{paddingLeft: 1 }}>{this.state.loanMiningBalance}</span></h2>
              </div>
            </Card>
          </Col>

          <Col md={6} sm={24} style={{padding: 2, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>总收益: <span style={{paddingLeft: 1 }}>{this.state.incomeTotal}</span></h2>
              </div>
            </Card>
          </Col>
          <Col md={6} sm={24} style={{padding: 1, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>可提现收益: <span style={{paddingLeft: 1 }}>{this.state.incomeBalance}</span></h2>
                <Button type="primary" onClick={this.showModal}>提现</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{padding: 10}}>
            <h3>提现列表:</h3>
            <div style={{backgroundColor: '#FFFFFF', padding: 10}}>
              <Table rowKey="ID"
                     dataSource={this.state.getdepositlist.data}
                     columns={columns_getdepositlist}
                     pagination={false}
                     footer={footer_getdepositlist}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Assets;