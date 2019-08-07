import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import Layout from 'antd/lib/layout';
import Typography from 'antd/lib/typography';
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import PlaylistsList from '../components/PlaylistsList';
import {
  getTagsRequest,
  getTagsSuccess,
  getTagsFailure
} from '../actions';

const { Title } = Typography;

class PlaylistsPage extends Component {
  componentDidMount() {
    this.props.getTags();
  }

  render() {
    return (
      <div id="playlists-page">
        <Layout>
          <Navbar />
          <Layout>
            <TagsPanel plain />
            <Divider />
            <Title>Playlists</Title>
            <PlaylistsList />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);
