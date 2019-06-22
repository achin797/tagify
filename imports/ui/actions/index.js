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

export const openModalCreateTag = () => {
  return {
    type: 'OPEN_MODAL_CREATE_TAG'
  };
};

export const closeModalCreateTag = () => {
  return {
    type: 'CLOSE_MODAL_CREATE_TAG'
  };
};

export const modalCreateTagOnChangeDisplayName = displayName => {
  return {
    type: 'MODAL_CREATE_TAG_ON_CHANGE_DISPLAY_NAME',
    payload: displayName
  };
};
