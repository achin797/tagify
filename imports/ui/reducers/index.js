import { combineReducers } from 'redux';

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const id = idGenerator();

const tags = [
];

tags.push({ id: id.next().value, displayName: 'chill' });
tags.push({ id: id.next().value, displayName: 'shower' });

const tagsReducer = (
  state = {
    tags
  },
  action
) => {
  switch (action.type) {
    case 'CREATE_TAG':
      return {
        ...state,
        tags: [
          ...state.tags,
          {
            id: id.next().value,
            displayName: action.payload
          }
        ]
      }
    case 'DELETE_TAG':
      return {
        ...state,
        tags: state.tags.filter(t => t.id !== action.payload)
      };
    default:
      return state;
  }
};

const modalCreateTagReducer = (
  state = {
    isOpen: false,
    displayName: ''
  },
  action
) => {
  switch (action.type) {
    case 'OPEN_MODAL_CREATE_TAG':
      return {
        ...state,
        isOpen: true
      };
    case 'CLOSE_MODAL_CREATE_TAG':
      return {
        ...state,
        isOpen: false,
        displayName: ''
      };
    case 'MODAL_CREATE_TAG_ON_CHANGE_DISPLAY_NAME':
      return {
        ...state,
        displayName: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  tags: tagsReducer,
  modalCreateTag: modalCreateTagReducer
});
