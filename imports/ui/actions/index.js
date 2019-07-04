export const createTag = displayName => {
  return {
    type: 'CREATE_TAG',
    payload: displayName
  };
};

export const deleteTag = tagId => {
  return {
    type: 'DELETE_TAG',
    payload: tagId
  };
};

export const tagsPanelShowInput = () => {
  return {
    type: 'TAGS_PANEL_SHOW_INPUT'
  };
};

export const tagsPanelHideInput = () => {
  return {
    type: 'TAGS_PANEL_HIDE_INPUT'
  };
};

export const onChangeDisplayName = displayName => {
  return {
    type: 'ON_CHANGE_DISPLAY_NAME',
    payload: displayName
  };
};

export const toggleCheckTag = tagId => {
  return {
    type: 'TOGGLE_CHECK_TAG',
    payload: tagId
  };
};

export const addTagToSong = (songId, tagId) => {
  return {
    type: 'ADD_TAG_TO_SONG',
    payload: { songId, tagId }
  };
};

export const addSongs = songs => {
    return {
        type: 'ADD_SONGS',
        payload: songs,
    };
};

export const removeTagFromSong = (songId, tagId) => {
  return {
    type: 'REMOVE_TAG_FROM_SONG',
    payload: { songId, tagId }
  };
};
