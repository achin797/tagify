import React from 'react';
import { connect } from 'react-redux';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;
const { Item } = Menu;

const Navbar = () => (
  <div id="navbar">
    <Sider theme="dark">
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <NavLink to="/home">
            <Icon type="home" />
            <span>Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/tags">
            <Icon type="tag" />
            <span>Tags</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/playlists">
            <Icon type="play-square" />
            <span>Playlists</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  </div>
);

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {})(Navbar);
