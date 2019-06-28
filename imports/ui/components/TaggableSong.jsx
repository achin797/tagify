import React from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
import Popover from 'antd/lib/popover';
import Tag from 'antd/lib/tag';
import AddTagForm from './AddTagForm';

const TaggableSong = ({
  song,
  tags
}) => {
  return (
    <Popover
      placement="bottomRight"
      content={<AddTagForm song={song} />}
      trigger="click"
    >
      <List.Item>
        <div>
          {song.title}
        </div>
        <div>
          <span>{song.artist} - {song.album}</span>
        </div>
        <div>
          {song.tags.map((tagId, index) => {
            const displayName = tags
              .filter(t => t.id === tagId)[0]
              .displayName;
            return <Tag key={index}>{displayName}</Tag>;
          })}
        </div>
      </List.Item>
    </Popover>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.tags.tags
  };
};

export default connect(mapStateToProps, {})(TaggableSong);
