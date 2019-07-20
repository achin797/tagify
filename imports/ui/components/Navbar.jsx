import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from 'antd/lib/menu';
import Layout from 'antd/lib/layout';
import Avatar from 'antd/lib/avatar';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  signOut
} from '../actions';

const { Sider } = Layout;
const { Item } = Menu;

class Navbar extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {
      location,
      history,
      userDisplayName,
      userAvatarUrl,
      signOut
    } = this.props;

    const pathnames = ['/', '/tags', '/playlists'];
    const selectedKey = [
      pathnames
      .findIndex(p => p === location.pathname)
      .toString()
    ];

    return (
      <div id="navbar">
        <Sider>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => signOut(history)}>
                  Sign out
                </Menu.Item>
              </Menu>
            }
            overlayClassName="user-dropdown-menu"
            trigger={['click']}
          >
            <div>
              <Avatar icon="user" src={userAvatarUrl} />
              <span>{userDisplayName}</span>
            </div>
          </Dropdown>
          <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
            <Menu.Item key="0">
              <Link to="/">
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
  }
}

const mapStateToProps = state => {
  return {
    userDisplayName: state.navbar.userDisplayName,
    userAvatarUrl: state.navbar.userAvatarUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUserRequest());
      Meteor.call('getUser', Meteor.userId(), (err, response) => {
        if (err) {
          dispatch(getUserFailure());
        } else {
          dispatch(getUserSuccess(response));
        }
      });
    },
    signOut: history => {
      Meteor.logout(() => {
        dispatch(signOut());
        history.push('/login');
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
