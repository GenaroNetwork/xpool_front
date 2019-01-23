import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom';
import Assets from './components/Assets';
import Cash from './components/Cash';
import Miner from './components/Miner';

const { Sider, Content, Footer } = Layout;

class Main extends Component {
  handlerMenuClick({ key }) {
    switch (key) {
      case "1":
        this.props.history.push('/assets');
        break;
      case "2":
        this.props.history.push('/cash');
        break;
      case "3":
        this.props.history.push('/miner');
        break;
      default:
        this.props.history.push('/');
        break;
    }
  }

  render() {
    return (
      <div>
        <Layout>
          <Sider theme="light">
              <Menu
              style={{ minHeight: 600 }}
              defaultSelectedKeys={['1']}
              mode="inline"
              onClick={this.handlerMenuClick.bind(this)}
            >
              <Menu.Item key="1">
                <Icon type="pay-circle" />
                我的资产
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="gold" />
                保证金管理
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="file-sync" />
                借币挖矿
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Switch>
                <Route path="/assets" component={Assets} />
                <Route path="/cash" component={Cash} />
                <Route path="/miner" component={Miner} />
              </Switch>
            </Content>
            <Footer>
              @Xpool
            </Footer>
          </Layout>
        </Layout>
   
      </div>
    )
  }
}

export default withRouter(Main);