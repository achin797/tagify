import React, { Component } from 'react'
import { connect } from 'react-redux';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import {
  addTagToSong,
  addTagToPlaylist,
  removeTagFromSong,
  removeTagFromPlaylist
} from '../actions';

class TaggablePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      mouseOffsetX: 0
    };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  handleMenuItemClick(item) {
    const {
      playlist,
      addTagToPlaylist,
      removeTagFromPlaylist
    } = this.props;
    const tagId = Number(item.key);
    !playlist.tags.includes(tagId)
      ? addTagToPlaylist(playlist.id, tagId, playlist.tracks)
      : removeTagFromPlaylist(playlist.id, tagId, playlist.tracks);
  }

  handleDropdownClick(event) {
    if (!this.state.visible) {
      this.setState({ mouseOffsetX: event.clientX - 360 });
    }
  }

  handleVisibleChange(flag) {
    this.setState({ visible: flag });
  }

  render() {
    const {
      playlist,
      tags
    } = this.props;

    const menu = (
      <Menu
        multiple={true}
        selectedKeys={playlist.tags.map(tag => tag.toString())}
        onClick={this.handleMenuItemClick}
        style={{ left: `${this.state.mouseOffsetX}px` }}
      >
        {tags.map(tag => (
          <Menu.Item key={tag.id}>
            {tag.displayName}
          </Menu.Item>
        ))}
      </Menu>
    );
        
    return (
      <Dropdown
        overlay={menu}
        overlayClassName="add-tag-dropdown-menu"
        placement="topLeft"
        trigger={['click']}
        visible={this.state.visible}
        onClick={this.handleDropdownClick}
        onVisibleChange={this.handleVisibleChange}
      >
        <List.Item>
          <div>
            {playlist.title}
          </div>
          <div>
            {playlist.tags.map((tagId, index) => {
              var displayName = tags
                .filter(t => t.id === tagId);
              if (displayName.length > 0){
                displayName = displayName[0].displayName;
              } else{
                return null;
              }

              return <Tag key={index}>{displayName}</Tag>;
            })}
          </div>
        </List.Item>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags.tags
  };
};


const mapDispatchToProps = dispatch => {
  return {
    addTagToPlaylist: (playlistId, tagId) => {
      // adds playlist id w/ associated tag to database, and adds tag to each song in the playlist
      Meteor.call('addPlaylistTag', Meteor.userId(), tagId, playlistId, (err, response) => {
        if (err) {
          notification.error({
            message: 'Add Tag Failed',
            description: 'Tag could not be added. Please try again.'
          });
        } else {
          var trackList = response.tracks.map(track => {
            var updated_track = {};
            updated_track['title'] = track.track.name;
            updated_track['id'] = track.track.id;
            updated_track['artists'] = track.track.artists.map(artist => {return artist.name;});
            updated_track['album'] = track.track.album.name;
            updated_track['tags'] = [tagId];
            return updated_track;
            }
          );
          // reducer: add tag to every song in playlist 
          for(song in trackList){
            dispatch(addTagToSong(trackList[song], response.tagId));
          }
          dispatch(addTagToPlaylist(response.playlistId, response.tagId));
        }
      });
    },

    removeTagFromPlaylist: (playlistId, tagId) => {
      
      Meteor.call('removePlaylistTag', Meteor.userId(), tagId, playlistId, (err, response) => {
        if (err) {
          notification.error({
            message: 'Remove Tag Failed',
            description: 'Tag could not be removed. Please reload the page.',
          });
        } else {
          songIdList = response.tracks.map(track => track.track.id);
          for(song in songIdList){
            dispatch(removeTagFromSong(songIdList[song], response.tagId));
          }
          dispatch(removeTagFromPlaylist(response.playlistId, response.tagId));
        }
      });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TaggablePlaylist);
