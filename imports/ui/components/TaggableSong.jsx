import React, { Component } from 'react'
import { connect } from 'react-redux';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import {
  addSong,
  addTagToSong,
  removeTagFromSong,
} from '../actions';

class TaggableSong extends Component {
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
      song,
      addTagToSong,
      removeTagFromSong,
      addSong,
      likedSongs,
    } = this.props;
    const tagId = Number(item.key);
    if(!song.tags.includes(tagId))
    {
      // check if the song being tagged is a searched song and is already in the library
      // if the song is already in the library it won't be pushed to the store, it'll just be tagged and the
      // updated tags will be visible on the home page
      if(likedSongs.filter(likedSong => likedSong.id === song.id).length === 0){
        //Add song to user's liked songs before tagging it
        addSong(song);
      }
        addTagToSong(song.id, tagId);
    }
    else{
      removeTagFromSong(song.id, tagId);
    }
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
      song,
      tags
    } = this.props;

    const menu = (
      <Menu
        multiple={true}
        selectedKeys={song.tags.map(tag => tag.toString())}
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
            {song.title}
          </div>
          <div>
            <span>{song.artists.join(", ")} - {song.album}</span>
          </div>
          <div>
            {song.tags.map((tagId, index) => {
              var displayName = tags
                .filter(t => t.id === tagId);
              if (displayName.length > 0){
                displayName = displayName[0].displayName;
              } else{
                displayName = "";
              }
              return <Tag key={index}>{displayName}</Tag>;
            })}
          </div>
        </List.Item>
      </Dropdown>
    );
  }
}

TaggableSong.defaultProps = {
  isSearchedSong: false,
};

const mapStateToProps = state => {
  return {
    tags: state.tags.tags,
    likedSongs: state.songs.songs
  };
};


const mapDispatchToProps = dispatch => {
  return {
    addSong: (song) => {
      Meteor.call('addToUsersLikedSongs', song.id, (err, response) => {
        if (err){
          notification.error({
            message: 'Add Tag Failed',
            description: err.toString()
          });
        }
        else {
          dispatch(addSong(song));
        }
      })
    },
    addTagToSong: (songId, tagId) => {
      Meteor.call('addSongTag', Meteor.userId(), tagId, songId, (err, response) => {
        if (err) {
          notification.error({
            message: 'Add Tag Failed',
            description: 'Tag could not be added to song. Please try again.'
          });
        } else {
          dispatch(addTagToSong(response.songId, response.tagId));
        }
      });
    },
    removeTagFromSong: (songId, tagId) => {
      Meteor.call('removeSongTag', Meteor.userId(), tagId, songId, (err, response) => {
        if (err) {
          notification.error({
            message: 'Remove Tag Failed',
            description: 'Tag could not be removed. Please reload the page.',
          });
        } else {
          dispatch(removeTagFromSong(response.songId, response.tagId));
        }
      });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TaggableSong);
