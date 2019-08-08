import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import Typography from 'antd/lib/typography';
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import {
  getTagsRequest,
  getTagsSuccess,
  getTagsFailure
} from '../actions';

const { Title } = Typography;

class ManagePage extends Component {
  componentDidMount = () => {
    this.props.getTags();
  };

  render = () => {
    const { tags } = this.props;
    return (
      <div id="manage-page">
        <Layout>
          <Navbar />
          <Layout>
            <Title>Manage Tags</Title>
            <TagsPanel editable />
          </Layout>
        </Layout>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    tags: state.tags.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTags: () => {
      dispatch(getTagsRequest());
      Meteor.call('getUserTags', Meteor.userId(), (err, response) => {
        if (err) {
          dispatch(getTagsFailure());
          notification.error({
            message: 'Fetch Tags Failed',
            description: 'Tags could not be fetched. Please reload the page.'
          });
        } else {
          dispatch(getTagsSuccess(response));
        }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePage);
