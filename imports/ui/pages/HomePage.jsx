import React, {Component} from 'react';
import Layout from 'antd/lib/layout';
import Checkbox from 'antd/lib/checkbox';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import SongList from '../components/SongList';
import {connect} from "react-redux";
import {getTagsFailure, getTagsRequest, getTagsSuccess} from "../actions";
import notification from "antd/lib/notification";
import Switch from "antd/lib/switch";
import {getToggledSongs} from "../utils/helpers";

const { Title } = Typography;

class HomePage extends Component{

  constructor(props) {
    super(props);
    this.state = {andOrToggle: false, filterText: ""};
  }

  componentDidMount() {
    this.props.getTags();
  }

  flipToggle(e) {
    this.setState({
      andOrToggle: e.target.checked
    })
  }

  updateFilter(filter) {
    this.setState({
      filterText: filter
    })
  }


  createPlaylist(){
    let playlistName = this.props.checkedTags.join(", ");

    //fetching the songs to add to playlist based on selected tags
    let selected_songs = getToggledSongs(this.props.songs, this.props.checkedTags, this.state.andOrToggle);

    Meteor.call("createPlaylist", playlistName, selected_songs, (err, response) => {
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

  render(){
        return (
            <div id="home-page">
                <Layout>
                    <Navbar />
                    <Layout>
                        <span>
                          <TagsPanel />
                          <div>
                            <Checkbox onChange={e => this.flipToggle(e)} />&nbsp;include all
                          </div>
                          <Button
                            className="generate-playlist-button"
                            type="primary"
                            disabled={this.props.checkedTags.length === 0}
                            onClick={() => this.createPlaylist()}>
                            Generate Playlist
                          </Button>
                        </span>
                        <Divider />
                        <Title>Liked Songs</Title>
                        <Input placeholder="Filter" allowClear onChange={event => {
                          this.updateFilter(event.target.value.toLowerCase());
                        }}
                        />
                        <SongList andToggle={this.state.andOrToggle} filterText={this.state.filterText}/>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    checkedTags: state.tagsPanel.checkedTags,
    songs: state.songs.songs
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
)(HomePage);
