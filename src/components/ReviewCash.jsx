import React from 'react';
import { Row, Col, Card, Table, Pagination,} from 'antd';
import * as Api from '../apis';


class ReviewCash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deposit: 0,
            getdepositlist: {
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
            depositBalance:0.00
        }
    }

    componentWillMount() {
        this.adminGetDepositList(this.state.getdepositlist.page, this.state.getdepositlist.pageSize);
        this.adminGetExtractDepositList(this.state.getextractdepositlist.page, this.state.getextractdepositlist.pageSize);
        this.getDepositBalance()
    }

    componentWillUpdate() {
    }

    adminGetDepositList = (page, pageSize) => {
        const token = localStorage.getItem('xpool-token');
        Api.adminGetDepositList(token, page, pageSize).then(res => {
            if (res.data.code) {
                this.setState(preState => ({
                    getdepositlist: Object.assign({}, preState.getdepositlist, {
                        page: res.data.data.page,
                        pageSize: res.data.data.pageSize,
                        total: res.data.data.total,
                        data: res.data.data.depositList
                    })
                }))
            }
        })
    }

    adminGetExtractDepositList = (page, pageSize) => {
        const token = localStorage.getItem('xpool-token');
        Api.adminGetExtractDepositList(token, page, pageSize).then(res => {
            if (res.data.code) {
                this.setState(preState => ({
                    getextractdepositlist: Object.assign({}, preState.getextractdepositlist, {
                        page: res.data.data.page,
                        pageSize: res.data.data.pageSize,
                        total: res.data.data.total,
                        data: res.data.data.extract_deposit_list
                    })
                }))
                this.getDepositBalance();
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
    }

    onHandleChangeDepositlistTable = (page, pageSize) => {
        this.adminGetDepositList(page, pageSize);
    }

    onHandleChangeExtractDepositlistTable = (page, pageSize) => {
        this.adminGetExtractDepositList(page, pageSize);
    }

    render() {

        const footer_getdepositlist = () => (
            <Pagination total={this.state.getdepositlist.total} current={this.state.getdepositlist.page} pageSize={this.state.getdepositlist.pageSize} hideOnSinglePage={true} onChange={this.onHandleChangeDepositlistTable}/>
        )

        const footer_getextractdepositlist = () => (
            <Pagination total={this.state.getextractdepositlist.total} current={this.state.getextractdepositlist.page} pageSize={this.state.getextractdepositlist.pageSize} hideOnSinglePage={true} onChange={this.onHandleChangeExtractDepositlistTable}/>
        )

        const columns_getdepositlist = [{
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        }, {
            title: 'Email',
            dataIndex: 'Email',
        }, {
            title: 'Hash',
            dataIndex: 'Hash',
            render: (Hash) => (
                Hash.slice(0, 10) + '...'
            )
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
        }, {
            title: 'Email',
            dataIndex: 'Email',
        },{
            title: '取现金额',
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
        },{
            title: '申请添加时间',
            dataIndex: 'CreatedAt',
        }]

        return(
            <div>
                <Row>
                    <Col span={24}>
                        <Card style={{margin: 20, marginTop: 0}}>
                            <h3 style={{padding: 10}}>申请增加保证金列表</h3>
                            <Table rowKey="ID"
                                   dataSource={this.state.getdepositlist.data}
                                   columns={columns_getdepositlist}
                                   pagination={false}
                                   footer={footer_getdepositlist}
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card style={{margin: 20, marginTop: 0}}>
                            <h3 style={{padding: 10}}>申请提现保证金列表</h3>
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
export default ReviewCash;