export const signInRequest = () => {
  return {
    type: 'SIGN_IN_REQUEST'
  };
};

export const signInSuccess = userSpotifyId => {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: userSpotifyId
  };
};

export const signInFailure = () => {
  return {
    type: 'SIGN_IN_FAILURE'
  };
};

export const getTagsRequest = () => {
  return {
    type: 'GET_TAGS_REQUEST'
  };
};

export const getTagsSuccess = tags => {
  return {
    type: 'GET_TAGS_SUCCESS',
    payload: tags
  };
};

export const getTagsFailure = () => {
  return {
    type: 'GET_TAGS_FAILURE'
  };
};

export const createTagRequest = () => {
  return {
    type: 'CREATE_TAG_REQUEST'
  };
};

export const createTagSuccess = tag => {
  return {
    type: 'CREATE_TAG_SUCCESS',
    payload: tag
  };
};

export const createTagFailure = () => {
  return {
    type: 'CREATE_TAG_FAILURE'
  };
};

export const deleteTagRequest = tagId => {
  return {
    type: 'DELETE_TAG_REQUEST',
    payload: tagId
  };
};

export const deleteTagSuccess = () => {
  return {
    type: 'DELETE_TAG_SUCCESS'
  };
};

export const deleteTagFailure = () => {
  return {
    type: 'DELETE_TAG_FAILURE'
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
