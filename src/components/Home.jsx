import React from 'react';
import {Steps,Row, Col, Card, Button, Table, Modal, Form, Input, Icon, message, Pagination} from 'antd';
import './Assets.css';
import * as Api from "../apis";
import './Home.css';
import IncreaseMargin from "./IncreaseMargin";
import ApplyForMining from "./ApplyForMining"
import EndMargin  from "./endMargin"
import WithdrawalMargin from "./WithdrawalMargin";
import Income from "./income"
import QuickList  from "./quickList"
const { Step } = Steps;

class Assets extends React.Component {
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
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
  steps = [
    {
      title: '出快列表',
      content:  <Row>
        <Col >
          <QuickList dataInit={this.dataInit.bind(this)}/>
        </Col>
      </Row>,
    },
    {
      title: '申请增加保证金',
      content: <Row>
        <Col >
          <IncreaseMargin dataInit={this.dataInit.bind(this)}/>
        </Col>
      </Row>,
    },
    {
      title: '申请挖矿',
      content: <Row>
        <Col >
          <ApplyForMining dataInit={this.dataInit.bind(this)}/>
        </Col>
      </Row>,
    },
    {
      title: '申请提现收益',
      content: <Row>
        <Col >
          <Income dataInit={this.dataInit.bind(this)}/>
        </Col>
      </Row>,
    },
    {
      title: '申请结束挖矿',
      content: <Row>
        <Col >
          <EndMargin dataInit={this.dataInit.bind(this)}/>
        </Col>
      </Row>,
    },
    {
      title: '申请提现保证金',
      content: <Row>
        <Col >
          <WithdrawalMargin dataInit={this.dataInit.bind(this)}/>
        </Col>
      </Row>,
    },
  ];

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
        this.getDepositlist(1,5);
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

  dataInit(){
    this.getDepositBalance();
    this.UserLoanMiningBalance();
    this.incomeTotal();
    this.incomeBalance();
  }

  componentWillMount(){
    this.dataInit()
    this.getDepositlist(this.state.getdepositlist.page, this.state.getdepositlist.pageSize);
  }

  render() {
    return (
      <div>
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
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <div>
            <div className="steps-action">
              {this.state.current < this.steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    下一步
                  </Button>
              )}
              {this.state.current > 0 && (
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    上一步
                  </Button>
              )}
            </div>
            <Steps current={this.state.current}>
              {this.steps.map(item => (
                  <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{this.steps[this.state.current].content}</div>
          </div>
        </Row>
      </div>
    )
  }
}

export default Assets;