import React, { Component } from 'react';
import { Layout, Dropdown, Menu, Icon } from 'antd';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './Main';
import Login from './components/Login';
import Register from './components/Register';
import Forget from './components/Forget';
import Reset from './components/Reset';
import './App.css';




const { Header, Content, } = Layout;

class App extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="login">用户登录</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="register">用户注册</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="forget">重置密码</Link>
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
                  <Icon type="user" style={{ color: '#FFFFFF', fontSize: '1.5rem'}}/>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content>
            <Switch>
              <Route path="/" exact component={Main}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/forget" component={Forget}/>
              <Route path="/reset" component={Reset}/>
              <Route path="/:type" component={Main}/>
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
