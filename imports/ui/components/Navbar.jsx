import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { Item } = Menu;

const Navbar = ({ location }) => {
  const pathnames = ['/home', '/tags', '/playlists'];
  const selectedKey = [
    pathnames
    .findIndex(p => p === location.pathname)
    .toString()
  ];

  return (
    <div id="navbar">
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
          <Menu.Item key="0">
            <Link to="/home">
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/tags">
              <Icon type="tag" />
              <span>Tags</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/playlists">
              <Icon type="play-square" />
              <span>Playlists</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(Navbar));
