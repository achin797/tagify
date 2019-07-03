import React from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
import TaggableSong from './TaggableSong';

const SongList = ({
  songs,
  checkedTags
}) => {
  const dataSource = checkedTags.length === 0
    ? songs
    : songs.filter(song => {
      return song.tags.some(tag => {
        return checkedTags.includes(tag);
      })
    });

  return (
    <div id="song-list">
      <List
        dataSource={dataSource}
        renderItem={song => <TaggableSong song={song} />}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    songs: state.songs.songs,
    checkedTags: state.tagsPanel.checkedTags
  };
};

export default connect(mapStateToProps, {})(SongList);
