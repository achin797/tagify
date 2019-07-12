import React, {Component} from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
import TaggableSong from './TaggableSong';
import {loadSongs} from "../actions";

class SongList extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {

    //Use local state to avoid repeated api calls

    if(!this.props.hasLoaded) {
      Meteor.call("getSavedTracks", (err, response) => {
          console.log("This message should only display on initial load");
          this.props.loadSongs(response);
        }
      )
    }
  }

  render(){
    const dataSource = this.props.checkedTags.length === 0
      ? this.props.songs
      : this.props.songs.filter(song => {
        if (this.props.andToggle) {
          //TODO: simplify statement?
          return this.props.checkedTags.every(checkedTag => {
            return song.tags.some(tag => tag === checkedTag)
          })
        } else {
          return song.tags.some(tag => {
            return this.props.checkedTags.includes(tag);
          })
        }
      });

    return (
      <div id="song-list">
        <List
          loading={!this.props.hasLoaded}
          dataSource={dataSource}
          renderItem={song => <TaggableSong song={song} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs.songs,
    hasLoaded: state.songs.hasLoaded,
    checkedTags: state.tagsPanel.checkedTags
  };
};

export default connect(mapStateToProps, {loadSongs})(SongList);
