import React, {Component} from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
import TaggableSong from './TaggableSong';
import {loadPlaylists} from "../actions";
import {getPlaylists} from "../utils/helpers";


class PlaylistsList extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {

    //Use local state to avoid repeated api calls

    if(!this.props.hasLoaded) {
      Meteor.call("getSavedPlaylists", (err, response) => {
          console.log(response);
          this.props.loadPlaylists(response);
        }
      )
    }
  }

  render(){
    const dataSource = getPlaylists(this.props.playlists);
    // const dataSource = this.props.playlists;
    console.log(dataSource);
    return (
      <div id="playlist-list">
        <List
          loading={!this.props.hasLoaded}
          // dataSource={dataSource}
          // renderItem={song => <TaggableSong song={song} />}
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
