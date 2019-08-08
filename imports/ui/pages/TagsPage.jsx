import React, {Component} from 'react';
import {connect} from 'react-redux';
import Divider from 'antd/lib/divider';
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import Typography from 'antd/lib/typography';
import notification from 'antd/lib/notification';
import TagsPanel from '../components/TagsPanel';
import {
  getTagsRequest,
  getTagsSuccess,
  getTagsFailure
} from '../actions';
import Checkbox from "antd/lib/checkbox";
import Button from "antd/lib/button";
import {getToggledSongs} from "../utils/helpers";

const {Title} = Typography;

class TagsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {andOrToggle: false};
  }

  componentDidMount() {
    this.props.getTags();
    if (!this.props.hasLoaded) {
      this.props.getSavedTracks();
    }
  }

  flipToggle(e) {
    this.setState({
      andOrToggle: e.target.checked
    })
  }

  createPlaylist(){
    let checkedTagsNames = this.props.tags.filter(tag =>
      this.props.checkedTags.includes(tag.id))
      .map(tag => tag.displayName);

    let playlistName = "Tagify - " + checkedTagsNames.join(", ") +
      (this.state.andOrToggle ? " (INCLUDE_ALL)": "");

    const taggedSongs = this.props.songs.filter(song => {
      return song.tags.length > 0;
    });

    const dataSource = getToggledSongs(taggedSongs, this.props.checkedTags, this.state.andOrToggle);

    Meteor.call("createPlaylist", playlistName, dataSource, (err, response) => {
      if (err) {
        notification.error({
          message: err.error
        });
      } else {
        notification.success({
          message: "Added playlist to your library"
        });
      }
    })
  }

  render() {
    const {
      hasLoaded,
      songs,
      tags
    } = this.props;

    const taggedSongs = songs.filter(song => {
      return song.tags.length > 0;
    });

    const dataSource = getToggledSongs(taggedSongs, this.props.checkedTags, this.state.andOrToggle);

    return (
      <div id="tags-page">
        <Layout>
          <Navbar/>
          <Layout>
            <span>
              <TagsPanel/>
              <div>
                <Checkbox onChange={e => this.flipToggle(e)}/>&nbsp;include all
              </div>
              {this.props.checkedTags.length === 0 && (
                <Tooltip
                  title="Click on tags above to filter"
                  mouseEnterDelay={0}
                  mouseLeaveDelay={0.5}
                  placement="right"
                >
                  <Button
                    className="generate-playlist-button"
                    type="primary"
                    disabled
                  >
                    Generate Playlist
                  </Button>
                </Tooltip>
              )}
              {this.props.checkedTags.length !== 0 && (
                <Button
                  className="generate-playlist-button"
                  type="primary"
                  disabled={this.props.checkedTags.length === 0}
                  onClick={() => this.createPlaylist()}
                >
                  Generate Playlist
                </Button>
              )}
            </span>
            <Divider/>
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
    tags: state.tags.tags,
    checkedTags: state.tagsPanel.checkedTags,
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
        dispatch({ type: 'LOAD_SONGS', payload: response });
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsPage);
