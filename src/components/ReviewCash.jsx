import React from 'react';
import {Row, Col, Card, Table, Pagination, Button, Modal, Select, Input, message} from 'antd';
import * as Api from '../apis';
const { Option } = Select;
const { TextArea } = Input;

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
            depositBalance:0.00,
            visible: false,
            TextAreaDiasble: false,
            extractDepositReviewVisible:false
        }
    }

    depositreviewPar = {
        reason:'',
        password:'',
        states:0,
        depositId:0
    };

    extractdepositreviewPar = {
        reason:'',
        password:'',
        states:0,
        depositId:0
    };

    componentWillMount() {
        this.adminGetDepositList(this.state.getdepositlist.page, this.state.getdepositlist.pageSize);
        this.adminGetExtractDepositList(this.state.getextractdepositlist.page, this.state.getextractdepositlist.pageSize);
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
    };

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
    };

    onHandleChangeDepositlistTable = (page, pageSize) => {
        this.adminGetDepositList(page, pageSize);
    };

    onHandleChangeExtractDepositlistTable = (page, pageSize) => {
        this.adminGetExtractDepositList(page, pageSize);
    };

    depositreview = (text) => {
        console.log(text.ID);
        this.setState({
            visible: true,
        });
        this.depositreviewPar = {
            reason:'',
            password:'',
            states:0,
            depositId:0
        };
        this.depositreviewPar.depositId=text.ID
    };

    extractdepositreview =(text)=>{
        this.setState({
            extractDepositReviewVisible: true,
        });
        this.extractdepositreviewPar = {
            reason:'',
            password:'',
            states:0,
            depositId:0
        };
        this.extractdepositreviewPar.depositId=text.ID
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        })
        this.setState({
            extractDepositReviewVisible: false,
        })
    }
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
        this.depositreviewPar.states = value
    };

    onChangePassword=(e)=> {
        this.depositreviewPar.password=e.target.value
    };

    onChangeTextArea=(e)=>{
        this.depositreviewPar.reason=e.target.value
    };

    onChangeExtractDepositReview=(value)=> {
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
        this.extractdepositreviewPar.states = value
    };

    onChangePasswordExtractDepositReview=(e)=> {
        this.extractdepositreviewPar.password=e.target.value
    };

    onChangeTextAreaExtractDepositReview=(e)=>{
        this.extractdepositreviewPar.reason=e.target.value
    };

    handleDepositReview =()=>{
        const token = localStorage.getItem('xpool-token');
        if(0 === this.depositreviewPar.depositId){
            return message.error("审核id不能为空")
        }

        if(0 === this.depositreviewPar.password){
            return message.error("密码不能为空")
        }

        if(0 === this.depositreviewPar.states){
            return message.error("请选择状态")
        }

        Api.depositReview(this.depositreviewPar.depositId, this.depositreviewPar.reason,
            token,this.depositreviewPar.password,this.depositreviewPar.states).then(res => {
            if (200 !==res.data.code) {
                return message.error(res.data.data)
            }
            message.success(res.data.data)
            this.setState({
                TextAreaDiasble:false
            })
            this.setState({
                visible:false
            })
            this.adminGetDepositList(this.state.getdepositlist.page, this.state.getdepositlist.pageSize);
        })
    };


    handleExtractDepositReview =()=>{
        const token = localStorage.getItem('xpool-token');
        if(0 === this.extractdepositreviewPar.depositId){
            return message.error("审核id不能为空")
        }

        if(0 === this.extractdepositreviewPar.password){
            return message.error("密码不能为空")
        }

        if(0 === this.extractdepositreviewPar.states){
            return message.error("请选择状态")
        }

        Api.extractDepositReview(this.extractdepositreviewPar.depositId, this.extractdepositreviewPar.reason,
            token,this.extractdepositreviewPar.password,this.extractdepositreviewPar.states).then(res => {
            if (200 !==res.data.code) {
                return message.error(res.data.data)
            }
            message.success(res.data.data)
            this.setState({
                TextAreaDiasble:false
            });
            this.setState({
                extractDepositReviewVisible:false
            });
            this.adminGetExtractDepositList(this.state.getextractdepositlist.page, this.state.getextractdepositlist.pageSize);
        })
    };

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
            title: '申请时间',
            dataIndex: 'CreatedAt',
        },{
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={()=>this.depositreview(record)}
                    disabled={record.State ===1 ? false:true}
                >审核</Button>
            ),
        },
        ];

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
        },{
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={()=>this.extractdepositreview(record)}
                    disabled={record.State ===1 ? false:true}
                >审核</Button>
            ),
        },];
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
                <Modal
                    title={"审核保证金"}
                    visible={this.state.visible}
                    onOk={this.handleDepositReview}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="审核保证金"
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
                                onOk={this.handleDepositReview}
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


                <Modal
                    title={"审核提取保证金"}
                    visible={this.state.extractDepositReviewVisible}
                    onOk={this.handleExtractDepositReview}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="审核提取保证金"
                >
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16}>
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={this.onChangeExtractDepositReview}
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
                                onChange={this.onChangePasswordExtractDepositReview}
                            />
                            <TextArea
                                style={{ width: 300,marginTop:10 }}
                                disabled={this.state.TextAreaDiasble}
                                placeholder="审核失败理由"
                                autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={this.onChangeTextAreaExtractDepositReview}
                            />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
export default ReviewCash;