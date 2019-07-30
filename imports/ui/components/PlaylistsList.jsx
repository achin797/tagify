import React, {Component} from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
<<<<<<< HEAD
import TaggablePlaylist from './TaggablePlaylist';
=======
import TaggableSong from './TaggableSong';
>>>>>>> Playlist page progress
import {loadPlaylists} from "../actions";
import {getPlaylists} from "../utils/helpers";


class PlaylistsList extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {

    //Use local state to avoid repeated api calls

    if(!this.props.hasLoaded) {
<<<<<<< HEAD
      Meteor.call("getSavedPlaylists", Meteor.userId(), (err, response) => {
=======
      Meteor.call("getSavedPlaylists", (err, response) => {
          console.log(response);
>>>>>>> Playlist page progress
          this.props.loadPlaylists(response);
        }
      )
    }
  }

  render(){
<<<<<<< HEAD
    const dataSource = this.props.playlists;

    return (
      <div id="song-list">
        <List
          loading={!this.props.hasLoaded}
          dataSource={dataSource}
          renderItem={playlist => <TaggablePlaylist playlist={playlist} />}
=======
    const dataSource = getPlaylists(this.props.playlists);
    // const dataSource = this.props.playlists;
    console.log(dataSource);
    return (
      <div id="playlist-list">
        <List
          loading={!this.props.hasLoaded}
          // dataSource={dataSource}
          // renderItem={song => <TaggableSong song={song} />}
>>>>>>> Playlist page progress
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlists: state.playlists.playlists,
    hasLoaded: state.playlists.hasLoaded,
  };
};

export default connect(mapStateToProps, {loadPlaylists})(PlaylistsList);
