import React, {Component} from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
import TaggablePlaylist from './TaggablePlaylist';
import {loadPlaylists} from "../actions";
import {getPlaylists} from "../utils/helpers";


class PlaylistsList extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {

    //Use local state to avoid repeated api calls

    if(!this.props.hasLoaded) {
      Meteor.call("getSavedPlaylists", Meteor.userId(), (err, response) => {
          this.props.loadPlaylists(response);
        }
      )
    }
  }

  render(){
    const dataSource = this.props.playlists;

    return (
      <div id="song-list">
        <List
          loading={!this.props.hasLoaded}
          dataSource={dataSource}
          renderItem={playlist => <TaggablePlaylist playlist={playlist} />}
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
