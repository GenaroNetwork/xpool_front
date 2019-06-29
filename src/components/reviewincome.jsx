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
            depositBalance:0.00,
            visible:false,
            TextAreaDiasble:false,
            visibleAddr:false,
            extractLoanMiningReviewVisible:false
        }
    }

    extractLoanMiningReviewPar = {
        reviewId:0,
        reason:'',
        password:0,
        states:0,
    };

    componentWillMount() {
        this.adminGetloanmininglist(this.state.getLoanMiningList.page, this.state.getLoanMiningList.pageSize);
    }

    componentWillUpdate() {
    }

    adminGetloanmininglist = (page, pageSize) => {
        const token = localStorage.getItem('xpool-token');
        Api.admin_extract_income_list(token, page, pageSize).then(res => {
            if (res.data.code) {
                this.setState(preState => ({
                    getLoanMiningList: Object.assign({}, preState.getLoanMiningList, {
                        page: res.data.data.page,
                        pageSize: res.data.data.pageSize,
                        total: res.data.data.total,
                        data: res.data.data.extract_income
                    })
                }))
            }
            this.getDepositBalance();
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

    onHandleChangeLoanMiningListTable = (page, pageSize) => {
        this.adminGetloanmininglist(page, pageSize);
    };

    onChangeExtractLoanMiningReviewTextArea=(e)=>{
        this.extractLoanMiningReviewPar.reason=e.target.value
    };

    loanMiningReview = (record) => {
        this.extractLoanMiningReviewPar.reviewId=record.ID
        this.setState({
            extractLoanMiningReviewVisible: true,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
        this.setState({
            visibleAddr: false,
        });
        this.setState({
            extractLoanMiningReviewVisible: false,
        });
    };

    onChangeExtractLoanMiningReview=(value)=> {
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
        this.extractLoanMiningReviewPar.states=value
    };
    onChangeExtractLoanMiningReviewPassword=(e)=> {
        this.extractLoanMiningReviewPar.password=e.target.value
    };
    extractLoanMiningReviewApi =()=>{
        const token = localStorage.getItem('xpool-token');
        if(0 === this.extractLoanMiningReviewPar.reviewId){
            return message.error("审核id不能为空")
        }

        if(0 === this.extractLoanMiningReviewPar.password){
            return message.error("密码不能为空")
        }

        if(0 === this.extractLoanMiningReviewPar.states){
            return message.error("请选择状态")
        }

        Api.extract_income_review(this.extractLoanMiningReviewPar.reviewId,
            this.extractLoanMiningReviewPar.reason,
            token,this.extractLoanMiningReviewPar.password,
            this.extractLoanMiningReviewPar.states).then(res => {
            if (200 !==res.data.code) {
                return message.error(res.data.data)
            }
            message.success(res.data.data);
            this.setState({
                TextAreaDiasble:false
            });
            this.setState({
                extractLoanMiningReviewVisible:false
            });
            this.adminGetloanmininglist(this.state.getLoanMiningList.page, this.state.getLoanMiningList.pageSize);
        })
    };

    render() {

        const footer_loanMiningList = () => (
            <Pagination total={this.state.getLoanMiningList.total} current={this.state.getLoanMiningList.page} pageSize={this.state.getLoanMiningList.pageSize} hideOnSinglePage={true} onChange={this.onHandleChangeLoanMiningListTable}/>
        );

        const columns_loanMiningList = [{
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        }, {
            title: 'Email',
            dataIndex: 'Email',
        }, {
            title: 'Value',
            dataIndex: 'Value',
        }, {
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

        return(
            <div>
                <Row>
                    <Col span={24}>
                        <Card style={{margin: 20, marginTop: 0}}>
                            <h3 style={{padding: 10}}>提现收益列表</h3>
                            <Table rowKey="ID"
                                   dataSource={this.state.getLoanMiningList.data}
                                   columns={columns_loanMiningList}
                                   pagination={false}
                                   footer={footer_loanMiningList}
                            />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title={"审核提现收益"}
                    visible={this.state.extractLoanMiningReviewVisible}
                    onOk={this.extractLoanMiningReviewApi}
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
                                onChange={this.onChangeExtractLoanMiningReview}
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
                                onChange={this.onChangeExtractLoanMiningReviewPassword}
                            />
                            <TextArea
                                style={{ width: 300,marginTop:10 }}
                                disabled={this.state.TextAreaDiasble}
                                placeholder="审核失败理由"
                                autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={this.onChangeExtractLoanMiningReviewTextArea}
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