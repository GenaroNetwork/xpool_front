import React, { Component } from 'react';
import { Layout, Dropdown, Menu, Icon } from 'antd';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './Main';
import Login from './components/Login';
import Register from './components/Register';
import Forget from './components/Forget';
import Reset from './components/Reset';
import PrivateRoute from './PrivateRoute';
import './App.css';
import * as Api from './apis';





const { Header, Content, } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logined: false,
      email: null
    }
    this.auth = this.auth.bind(this);
  }

  componentWillMount() {
    this.auth();
  }

  auth() {
    const token = localStorage.getItem('xpool-token');
    console.log(token); 
    const tag = token? true : false;
    this.setState({
      logined: tag
    })
    if (tag) {
      Api.getUserInfo(token).then(res => {
        switch (res.data.code) {
          case 200:
            this.setState({
              email: res.data.data.email
            })
            break;
          default:
            break;
        }
      })
    } else {
      this.setState({
        email: null
      })
    }
  }

  logout() {
    localStorage.clear('xpool-token');
    this.setState({
      logined: false,
      email: null
    })
  }


  render() {
    const menu = this.state.logined? (<Menu>
      <Menu.Item>
        <Link to="reset">重置密码</Link>
      </Menu.Item>
      <Menu.Item>
        <span onClick={this.logout.bind(this)}>退出登录</span>
      </Menu.Item>
    </Menu>) :(
      <Menu>
        <Menu.Item>
          <Link to="login">用户登录</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="register">用户注册</Link>
        </Menu.Item>
       
      </Menu>
    );
    return (
      <div className="XpoolClient">
        <Layout>
          <Header>
            <div className="brand">
              <Link to="/">
                <h1>Xpool</h1>
              </Link>
            </div>
            <div className="right-component">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  { this.state.email? <span style={{color: '#FFFFFF', paddingRight: 10, fontSize: 16}}>{this.state.email}</span> : null}
                  <Icon type="user" style={{ color: '#FFFFFF', fontSize: '1.5rem'}}/>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content>
            <Switch>
            <PrivateRoute path="/" exact component={Main} logined={this.state.logined}/>
              <Route path="/login" exact render={props => (
                <Login {...props} onLogin={this.auth} />
              )} />
              <Route path="/register" component={Register}/>
              <Route path="/forget" component={Forget}/>
              <PrivateRoute path="/reset" component={Reset} logined={this.state.logined}/>
              <PrivateRoute path="/:type" component={Main} logined={this.state.logined}/>
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
