import React, {Component} from 'react';
import Layout from 'antd/lib/layout';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import SongList from '../components/SongList';
import {Button} from "antd";
import {connect} from "react-redux";
import {getTagsFailure, getTagsRequest, getTagsSuccess} from "../actions";
import notification from "antd/lib/notification";
import Switch from "antd/lib/switch";

const { Title } = Typography;

class HomePage extends Component{

  constructor(props) {
    super(props);
    this.state = {andOrToggle: false};
  }

  componentDidMount() {
    this.props.getTags();
  }

  flipToggle(){
    this.setState({
      andOrToggle: !this.state.andOrToggle
    })
  }

  createPlaylist(){
    let playlistName = this.props.checkedTags.join(", ");

    //fetching the songs to add to playlist based on selected tags
    let selected_songs = this.props.songs.filter(song => {
      return song.tags.some(tag => {
        return this.props.checkedTags.includes(tag);
      })
    });

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
                          <Button
                            className="generate-playlist-button"
                            type="primary"
                            disabled={this.props.checkedTags.length === 0}
                            onClick={() => this.createPlaylist()}>
                            generate playlist
                          </Button>
                        </span>
                        <Divider />
                        <Title>Liked Songs
                          <Switch
                            className="and-or-toggle"
                            checkedChildren="AND"
                            unCheckedChildren="OR"
                            onChange={() => this.flipToggle()}
                            />
                        </Title>
                        <SongList andToggle={this.state.andOrToggle}/>
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