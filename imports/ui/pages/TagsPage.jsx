import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout';
import List from 'antd/lib/list';
import Button from 'antd/lib/button';
import ModalCreateTag from '../components/ModalCreateTag';
import {
  deleteTag,
  openModalCreateTag
} from '../actions';

const TagsPage = ({
  tags,
  deleteTag,
  openModalCreateTag
}) => (
  <div id="home-page">
    <Layout>
      <Navbar />
      <Layout>
        <List
          bordered
          dataSource={tags}
          renderItem={item => (
            <List.Item>
              {item.displayName}
              <Button
                shape="circle"
                size="small"
                onClick={() => deleteTag(item.id)}
              >X</Button>
            </List.Item>
          )}
        />
        <Button onClick={() => openModalCreateTag()}>Add new tag</Button>
        <ModalCreateTag />
      </Layout>
    </Layout>
  </div>
);

const mapStateToProps = state => {
  return {
    tags: state.tags.tags
  };
};

export default connect(mapStateToProps, {
  deleteTag,
  openModalCreateTag
})(TagsPage);
