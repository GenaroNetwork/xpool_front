import React from 'react';
import { Row, Col, Card, Table, Pagination,} from 'antd';
import EndMineForm from './EndMineForm';
import StartMineForm from './StartMineForm';
import * as Api from '../apis';


class Miner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: 0,
      getLoanMiningList: {
        page: 1,
        pageSize: 5,
        data: [],
        total: 0
      },
      getextractdepositlist: {
        page: 1,
        pageSize: 5,
        data: [],
        total: 0
      },
      depositBalance:0.00,
      loanMiningBalance:0.00,
    }
  }

  componentWillMount() {
    this.getLoanMiningList(this.state.getLoanMiningList.page, this.state.getLoanMiningList.pageSize);
    this.getextractloanmininglist(this.state.getextractdepositlist.page, this.state.getextractdepositlist.pageSize);
    this.getDepositBalance();
    this.UserLoanMiningBalance();
  }

  componentWillUpdate() {
  }

  getLoanMiningList = (page, pageSize) => {
    const token = localStorage.getItem('xpool-token');
    Api.getLoanMiningList(token, page, pageSize).then(res => {
      if (res.data.code) {
        this.setState(preState => ({
          getLoanMiningList: Object.assign({}, preState.getLoanMiningList, {
            page: res.data.data.page,
            pageSize: res.data.data.pageSize,
            total: res.data.data.total,
            data: res.data.data.loan_mining_list
          })
        }))
      }
      this.getDepositBalance();
      this.UserLoanMiningBalance();
    })
  }

  getextractloanmininglist = (page, pageSize) => {
    const token = localStorage.getItem('xpool-token');
    Api.getextractloanmininglist(token, page, pageSize).then(res => {
      if (res.data.code) {
        this.setState(preState => ({
          getextractdepositlist: Object.assign({}, preState.getextractdepositlist, {
            page: res.data.data.page,
            pageSize: res.data.data.pageSize,
            total: res.data.data.total,
            data: res.data.data.loan_mining_list
          })
        }))
        this.getDepositBalance();
        this.UserLoanMiningBalance();
      }
    })
  };

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

  onHandleChangeLoanMiningListTable = (page, pageSize) => {
    this.getLoanMiningList(page, pageSize);
  };

  onHandleChangeExtractDepositlistTable = (page, pageSize) => {
    this.getextractloanmininglist(page, pageSize);
  };

  render() {

    const footer_loanMiningList = () => (
        <Pagination total={this.state.getLoanMiningList.total} current={this.state.getLoanMiningList.page} pageSize={this.state.getLoanMiningList.pageSize} hideOnSinglePage={true} onChange={this.onHandleChangeLoanMiningListTable}/>
    )

    const footer_getextractdepositlist = () => (
        <Pagination total={this.state.getextractdepositlist.total} current={this.state.getextractdepositlist.page} pageSize={this.state.getextractdepositlist.pageSize} hideOnSinglePage={true} onChange={this.onHandleChangeExtractDepositlistTable}/>
    )

    const columns_loanMiningList = [{
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    }, {
      title: 'Email',
      dataIndex: 'Email',
    }, {
        title: '保证金',
      dataIndex: 'Deposit',
    }, {
      title: '挖矿资金',
      dataIndex: 'Loan',
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

    const columns_getextractdepositlist = [{
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    }, {
      title: 'Email',
      dataIndex: 'Email',
    },{
      title: '保证金',
      dataIndex: 'Deposit',
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
    },{
      title: '申请添加时间',
      dataIndex: 'CreatedAt',
    }]

    return(
        <div>
          <Row>
            <Col md={12} sm={24}>
              <Card style={{margin: 20}}>
                <div className="header">
                  <h2>保证金余额: <span style={{paddingLeft: 10 }}>{this.state.depositBalance}</span></h2>
                </div>
                <Row style={{marginTop: 30}}>
                  <Col md={6} sm={24}>
                    <StartMineForm onComplete={this.getLoanMiningList}/>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={12} sm={24}>
              <Card style={{margin: 20}}>
                <div className="header">
                  <h2>挖矿保证金: <span style={{paddingLeft: 10 }}>{this.state.loanMiningBalance}</span></h2>
                </div>
                <Row style={{marginTop: 30}}>
                  <Col md={6} sm={24}>
                    <EndMineForm onComplete={this.getextractloanmininglist}/>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card style={{margin: 20, marginTop: 0}}>
                <h3 style={{padding: 10}}>申请挖矿列表</h3>
                <Table rowKey="ID"
                       dataSource={this.state.getLoanMiningList.data}
                       columns={columns_loanMiningList}
                       pagination={false}
                       footer={footer_loanMiningList}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card style={{margin: 20, marginTop: 0}}>
                <h3 style={{padding: 10}}>申请结束挖矿列表</h3>
                <Table rowKey="ID"
                       dataSource={this.state.getextractdepositlist.data}
                       columns={columns_getextractdepositlist }
                       pagination={false}
                       footer={footer_getextractdepositlist}
                />
              </Card>
            </Col>
          </Row>
        </div>
    )
  }
}
export default Miner;