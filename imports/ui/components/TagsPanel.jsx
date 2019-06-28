import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tag from 'antd/lib/tag';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import {
  createTag,
  deleteTag,
  tagsPanelShowInput as showInput,
  tagsPanelHideInput as hideInput,
  onChangeDisplayName as handleChange,
  toggleCheckTag
} from '../actions';

const { CheckableTag } = Tag;

class TagsPanel extends Component {
  constructor(props) {
    super(props);
    this.saveRef = this.saveRef.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.inputVisible && this.props.inputVisible) {
      this.input.focus();
    }
  }

  saveRef(input) {
    this.input = input;
  }

  handleConfirm() {
    if (this.props.displayName) {
      this.props.createTag(this.props.displayName);
    }
    this.props.hideInput();
  }

  render() {
    const {
      editable,
      tags,
      checkedTags,
      inputVisible,
      displayName,
      deleteTag,
      showInput,
      handleChange,
      toggleCheckTag
    } = this.props;

    return (
      <div id="tags-panel">
        {editable && tags.map((tag, index) => {
          return (
            <span key={index}>
              <Tag closable onClose={() => deleteTag(tag.id)}>
                {tag.displayName}
              </Tag>
            </span>
          );
        })}
        {!editable && tags.map((tag, index) => {
          return (
            <span key={index}>
              <CheckableTag
                checked={checkedTags.includes(tag.id)}
                onChange={() => toggleCheckTag(tag.id)}
              >
                {tag.displayName}
              </CheckableTag>
            </span>
          );
        })}
        {inputVisible && (
          <span>
            <Input
              ref={this.saveRef}
              type="text"
              size="small"
              value={displayName}
              onChange={e => handleChange(e.target.value)}
              onBlur={this.handleConfirm}
              onPressEnter={this.handleConfirm}
            />
          </span>
        )}
        {!inputVisible && (
          <span>
            <Tag onClick={() => showInput()}>
              <Icon type="plus" /> new tag
            </Tag>
          </span>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags.tags,
    checkedTags: state.tagsPanel.checkedTags,
    inputVisible: state.tagsPanel.inputVisible,
    displayName: state.tagsPanel.displayName
  };
};

export default connect(mapStateToProps, {
  createTag,
  deleteTag,
  showInput,
  hideInput,
  handleChange,
  toggleCheckTag
})(TagsPanel);
