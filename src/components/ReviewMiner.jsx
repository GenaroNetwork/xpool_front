import React from 'react';
import {Row, Col, Card, Table, Pagination, Button, Select, Modal, Input, message} from 'antd';
import * as Api from '../apis';
const { Option } = Select;
const { TextArea } = Input;

class ReviewMiner extends React.Component {
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
            visible:false,
            TextAreaDiasble:false,
        }
    }

    loanMiningReviewPar = {
        loanMiningId:0,
        reason:'',
        password:0,
        states:0,
        address:0,
        tag:0
    };

    componentWillMount() {
        this.getLoanMiningList(this.state.getLoanMiningList.page, this.state.getLoanMiningList.pageSize);
        this.getextractloanmininglist(this.state.getextractdepositlist.page, this.state.getextractdepositlist.pageSize);
        this.getDepositBalance()
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

    onHandleChangeLoanMiningListTable = (page, pageSize) => {
        this.getLoanMiningList(page, pageSize);
    }

    onHandleChangeExtractDepositlistTable = (page, pageSize) => {
        this.getextractloanmininglist(page, pageSize);
    }

    loanMiningReview = (record) => {
        this.setState({
            visible: true,
        });
        this.loanMiningReviewPar = {
            loanMiningId:0,
            reason:'',
            password:0,
            states:0,
            address:0,
            tag:0
        };
        this.loanMiningReviewPar.loanMiningId=record.ID
        this.loanMiningReviewPar.tag=0;
        const token = localStorage.getItem('xpool-token');
        Api.isBindingMiningAddress(record.ID,token).then(res => {
            if (200 !==res.data.code) {
                return message.error(res.data.data)
            }
            if (false === res.data.code){
                this.loanMiningReviewPar.tag=1
            }
        })
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    onChange=(value)=> {
        if (3 === value) {
            this.setState({
                TextAreaDiasble:true
            })
        }
        if (5 === value) {
            this.setState({
                TextAreaDiasble:false
            })
        }
        this.loanMiningReviewPar.states = value
    };

    onChangePassword=(e)=> {
        this.loanMiningReviewPar.password=e.target.value
    };

    onChangeTextArea=(e)=>{
        this.loanMiningReviewPar.reason=e.target.value
    };

    loanMiningReviewApi =()=>{
        const token = localStorage.getItem('xpool-token');
        if(0 === this.loanMiningReviewPar.loanMiningId){
            return message.error("审核id不能为空")
        }

        if(0 === this.loanMiningReviewPar.password){
            return message.error("密码不能为空")
        }

        if(0 === this.loanMiningReviewPar.states){
            return message.error("请选择状态")
        }

        if(1 === this.loanMiningReviewPar.tag){
            if ("" === this.loanMiningReviewPar.address){
                return message.error("请选择状态")
            }
        }

        Api.loanMiningReview(this.loanMiningReviewPar.loanMiningId,this.loanMiningReviewPar.reason,
            token,this.loanMiningReviewPar.password,this.loanMiningReviewPar.states,
            this.loanMiningReviewPar.address).then(res => {
            if (200 !==res.data.code) {
                return message.error(res.data.data)
            }
            message.success(res.data.data);
            this.setState({
                TextAreaDiasble:false
            });
            this.setState({
                visible:false
            });
            this.getLoanMiningList(this.state.getLoanMiningList.page, this.state.getLoanMiningList.pageSize);
        })
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
        },{
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={()=>this.loanMiningReview(record)}
                    disabled={record.State ===1 ? false:true}
                >审核</Button>
            ),
        },];


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
                            <h3 style={{padding: 10}}>申请借币挖矿列表</h3>
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
                            <Table dataSource={this.state.getextractdepositlist.data} columns={columns_getextractdepositlist } pagination={false} footer={footer_getextractdepositlist} />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title={"审核挖矿"}
                    visible={this.state.visible}
                    onOk={this.loanMiningReviewApi}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="审核挖矿"
                >
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16}>
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                size={"large"}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value={3}>通过</Option>
                                <Option value={5}>拒绝</Option>
                            </Select>
                            <Input.Password
                                placeholder="请输入密码" size={"large"}
                                style={{ width: 300,marginTop:10 }}
                                onChange={this.onChangePassword}
                            />
                            <TextArea
                                style={{ width: 300,marginTop:10 }}
                                disabled={this.state.TextAreaDiasble}
                                placeholder="审核失败理由"
                                autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={this.onChangeTextArea}
                            />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
export default ReviewMiner;