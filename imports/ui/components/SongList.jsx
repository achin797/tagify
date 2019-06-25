import React from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
import Popover from 'antd/lib/popover';

const SongList = ({ songs }) => (
  <div id="song-list">
    <List
      dataSource={songs}
      renderItem={song => (
        <Popover content={<input type="text" />} trigger="click">
          <List.Item>
            <div>
              {song.title}
            </div>
            <div>
              <span>{song.artist} - {song.album}</span>
            </div>
          </List.Item>
        </Popover>
      )}
    />
  </div>
);

const mapStateToProps = state => {
  return {
    songs: state.songs.displayedSongs
  };
};

export default connect(mapStateToProps, {})(SongList);
