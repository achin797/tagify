import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tag from 'antd/lib/tag';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';
import {
  createTagRequest,
  createTagSuccess,
  createTagFailure,
  deleteTagRequest,
  deleteTagSuccess,
  deleteTagFailure,
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
    const { displayName, createTag, hideInput } = this.props;
    if (displayName) {
      createTag(displayName);
    } else {
      hideInput();
    }
  }

  render() {
    const {
      editable,
      tags,
      checkedTags,
      inputVisible,
      isInputDisabled,
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
              <Tag closable onClose={e => deleteTag(tag.id, e)}>
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
              disabled={isInputDisabled}
              size="small"
              type="text"
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
    isInputDisabled: state.tagsPanel.isInputDisabled,
    displayName: state.tagsPanel.displayName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTag: displayName => {
      dispatch(createTagRequest());
      Meteor.call('createTag', Meteor.userId(), displayName, (err, response) => {
        if (err) {
          dispatch(createTagFailure());
          notification.error({
            message: 'Create Tag Failed',
            description: 'Tag could not be created. Please try again.'
          });
        } else {
          dispatch(createTagSuccess(response));
        }
      });
    },
    deleteTag: (tagId, e) => {
      e.preventDefault();
      dispatch(deleteTagRequest(tagId));
      Meteor.call('deleteTag', Meteor.userId(), tagId, err => {
        if (err) {
          dispatch(deleteTagFailure());
          notification.error({
            message: 'Delete Tag Failed',
            description: 'Tag could not be deleted. Please reload the page.',
          });
        } else {
          dispatch(deleteTagSuccess());
        }
      });
    },
    showInput: () => dispatch(showInput()),
    hideInput: () => dispatch(hideInput()),
    handleChange: value => dispatch(handleChange(value)),
    toggleCheckTag: tagId => dispatch(toggleCheckTag(tagId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsPanel);
