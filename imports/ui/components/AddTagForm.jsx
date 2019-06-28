import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';

const AddTagForm = ({
  song,
  tags
}) => {
  const menu = (
    <Menu>
      <Menu.Item>
        Item
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="add-tag-form">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">Test</a>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.tags.tags
  };
};

export default connect(mapStateToProps, {})(AddTagForm);
