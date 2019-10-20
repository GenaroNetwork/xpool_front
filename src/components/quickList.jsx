import React from 'react';
import {Row, Col, Card, Table, Pagination,} from 'antd';
import * as Api from '../apis';


class quickList extends React.Component {
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
        this.getDepositlist(this.state.getdepositlist.page, this.state.getdepositlist.pageSize);
        this.getDepositBalance()
    }

    componentWillUpdate() {
    }

    getDepositlist = (page, pageSize) => {
        const token = localStorage.getItem('xpool-token');
        Api.getQuickList("0x5b3fd5ac978edeaca6428a029d783b57e634ddcb", page*pageSize, pageSize).then(res => {
            console.log(res.data)
            this.setState(preState => ({
                getdepositlist: Object.assign({}, preState.data, {
                    page: res.data.meta.offset,
                    pageSize: res.data.meta.limit,
                    total: res.data.meta.total,
                    data: res.data.data
                })
            }))
        })
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
    }

    onHandleChangeDepositlistTable = (page, pageSize) => {
        this.getDepositlist(page, pageSize);
    }

    onHandleChangeExtractDepositlistTable = (page, pageSize) => {
        this.getextractDepositlist(page, pageSize);
    }

    render() {

        const footer_getdepositlist = () => (
            <Pagination total={this.state.getdepositlist.total} current={this.state.getdepositlist.page} pageSize={this.state.getdepositlist.pageSize} hideOnSinglePage={true} onChange={this.onHandleChangeDepositlistTable}/>
        )

        const columns_getdepositlist = [{
            title: '区块高度',
            dataIndex: 'number',
            key: 'number',
        },{
            title: '交易数',
            dataIndex: 'transactions',
            key: 'transactions',
            render: (transactions) => {
                return transactions.length
            }
        },{
            title: '出快时间',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp) => {
                return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
            }
        },{
            title: '矿工',
            dataIndex: 'miner',
            key: 'miner',
        },{
            title: 'gsa使用量',
            dataIndex: 'gasUsed',
            key: 'gasUsed',
        },{
            title: 'gsa上线',
            dataIndex: 'gasLimit',
            key: 'gasLimit',
        }
        ];

        return(
            <div>
                <Row>
                    <Col span={24}>
                        <Card style={{margin: 20, marginTop: 0}}>
                            <h3 style={{padding: 10}}>矿工出快列表</h3>
                            <Table rowKey="ID"
                                   dataSource={this.state.getdepositlist.data}
                                   columns={columns_getdepositlist}
                                   pagination={false}
                                   footer={footer_getdepositlist}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default quickList;