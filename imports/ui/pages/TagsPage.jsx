import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
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
    if (!this.props.hasLoaded) {
      this.props.getSavedTracks();
    }
  }

  render() {
    const {
      hasLoaded,
      songs,
      tags
    } = this.props;

    const dataSource = songs.filter(song => {
      return song.tags.length > 0;
    });

    return (
      <div id="tags-page">
        <Layout>
          <Navbar />
          <Layout>
            <Title>Tags</Title>
            <TagsPanel editable />
            <Divider />
            <Title>Tagged Songs</Title>
            <div id="song-list">
              <List
                loading={!hasLoaded}
                dataSource={dataSource}
                renderItem={song => (
                  <List.Item>
                    <div>
                      {song.title}
                    </div>
                    <div>
                      <span>
                        {song.artists.join(', ')} - {song.album}
                      </span>
                    </div>
                    <div>
                      {song.tags.map((tagId, index) => {
                        const displayName = tags
                          .filter(t => t.id === tagId)[0]
                          .displayName;
                        return <Tag key={index}>{displayName}</Tag>
                      })}
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasLoaded: state.songs.hasLoaded,
    songs: state.songs.songs,
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
    },
    getSavedTracks: () => {
      Meteor.call('getSavedTracks', Meteor.userId(), (err, response) => {
        console.log('This message should only display on initial load');
        dispatch({ type: 'LOAD_SONGS', payload: response });
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsPage);
