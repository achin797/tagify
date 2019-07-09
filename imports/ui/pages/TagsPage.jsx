import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout';
import Typography from 'antd/lib/typography';
import notification from 'antd/lib/notification';
import TagsPanel from '../components/TagsPanel';
import {
  getTagsRequest,
  getTagsSuccess,
  getTagsFailure
} from '../actions';

const { Title } = Typography;

class TagsPage extends Component {
  componentDidMount() {
    this.props.getTags();
  }

  render() {
    return (
      <div id="tags-page">
        <Layout>
          <Navbar />
          <Layout>
            <Title>Tags</Title>
            <TagsPanel editable />
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
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
)(TagsPage);
