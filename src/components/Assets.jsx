import React from 'react';
import { Row, Col, Card, Button, Table, Modal } from 'antd';
import './Assets.css';

class Assets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
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
          <Col md={8} sm={24} style={{padding: 10}}>
            <Card>
              <div className="header">
                <h2>余额: <span style={{paddingLeft: 10 }}>20009</span></h2>
              </div>
            </Card>
          </Col>
          <Col md={8} sm={24} style={{padding: 10, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>挖矿收益: <span style={{paddingLeft: 10 }}>20009</span></h2>
              </div>
            </Card>
          </Col>
          <Col md={8} sm={24} style={{padding: 10, paddingLeft: 0}}>
            <Card>
              <div className="header">
                <h2>可提现金额: <span style={{paddingLeft: 10 }}>20009</span></h2>
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