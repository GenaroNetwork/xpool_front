import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom';
import Assets from './components/Assets';
import Cash from './components/Cash';
import Miner from './components/Miner';
import ReviewCash from './components/ReviewCash';
import ReviewMiner from './components/ReviewMiner';
import ReviewIncome from './components/reviewincome';
import Home from './components/Home';
import * as Api from "./apis";


const { Sider, Content, Footer } = Layout;

class Main extends Component {
  constructor(prpos) {
    super(prpos);
    this.state = {
      defaultSelectedKeys: ['1'],
      defaultRole:0
    };
  }


  componentWillMount() {
    switch (this.props.location.pathname) {
      case '/miner':
        this.setState({
          defaultSelectedKeys: ['3']
        })
        break;
      case '/assets':
        this.setState({
          defaultSelectedKeys: ['1']
        })
        break;
      case '/cash':
        this.setState({
          defaultSelectedKeys: ['2']
        })
        break;
      case '/reviewCash':
        this.setState({
          defaultSelectedKeys: ['4']
        })
        break;
      case '/reviewMiner':
        this.setState({
          defaultSelectedKeys: ['5']
        })
        break;
      case '/incomeMiner':
        this.setState({
          defaultSelectedKeys: ['6']
        })
        break;
      default:
        break;
    }

    const token = localStorage.getItem('xpool-token');
    Api.getUserInfo(token).then(res => {
      switch (res.data.code) {
        case 200:
          this.setState({
            defaultRole: res.data.data.role
          })
          localStorage.setItem('xpool-mining',res.data.data.mining);
      }
    })
  }

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
      case "4":
        this.props.history.push('/reviewCash');
        break;
      case "5":
        this.props.history.push('/reviewMiner');
        break;
      case "6":
        this.props.history.push('/reviewincome');
        break;
      case "7":
        this.props.history.push('/home');
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
          {this.state.defaultRole == 1 ? <Sider theme="light">
            <Menu
                style={{ minHeight: 600 }}
                defaultSelectedKeys={this.state.defaultSelectedKeys}
                mode="inline"
                onClick={this.handlerMenuClick.bind(this)}
            >
              {/*<Menu.Item key="1">*/}
              {/*<Icon type="pay-circle" />*/}
              {/*我的资产*/}
              {/*</Menu.Item>*/}
              {/*<Menu.Item key="2">*/}
              {/*<Icon type="gold" />*/}
              {/*保证金管理*/}
              {/*</Menu.Item>*/}
              {/*<Menu.Item key="3">*/}
              {/*<Icon type="file-sync" />*/}
              {/*申请挖矿*/}
              {/*</Menu.Item>*/}
              <Menu.Item key="7">
                <Icon type="file-sync" />
                首页
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="gold" />
                审核保证金
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="file-sync" />
                审核挖矿
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="file-sync" />
                审核收益
              </Menu.Item>
            </Menu>
          </Sider>:""}
          <Layout>
            <Content>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/assets" component={Assets} />
                <Route path="/cash" component={Cash} />
                <Route path="/miner" component={Miner} />
                <Route path="/reviewcash" component={ReviewCash} />
                <Route path="/reviewminer" component={ReviewMiner} />
                <Route path="/reviewincome" component={ReviewIncome} />
                <Route path="/home" component={Home} />
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