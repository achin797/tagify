import { combineReducers } from 'redux';

const navbarReducer = (
  state = {
    userDisplayName: '',
    userAvatarUrl: ''
  },
  action
) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const tagsPanelReducer = (
  state = {
    checkedTags: [],
    inputVisible: false,
    isInputDisabled: false,
    displayName: ''
  },
  action
) => {
  switch (action.type) {
    case 'TAGS_PANEL_SHOW_INPUT':
      return {
        ...state,
        inputVisible: true
      };
    case 'TAGS_PANEL_HIDE_INPUT':
      return {
        ...state,
        inputVisible: false,
        displayName: ''
      };
    case 'ON_CHANGE_DISPLAY_NAME':
      return {
        ...state,
        displayName: action.payload
      };
    case 'CREATE_TAG_REQUEST':
      return {
        ...state,
        isInputDisabled: true
      };
    case 'CREATE_TAG_SUCCESS':
      return {
        ...state,
        inputVisible: false,
        isInputDisabled: false,
        displayName: ''
      };
    case 'CREATE_TAG_FAILURE':
      return {
        ...state,
        isInputDisabled: false
      };
    case 'TOGGLE_CHECK_TAG':
      return state.checkedTags.includes(action.payload)
        ? {
          ...state,
          checkedTags: state.checkedTags.filter(t => {
            return t !== action.payload;
          })
        }
        : {
          ...state,
          checkedTags: [
            ...state.checkedTags,
            action.payload
          ]
        };
    case 'DELETE_TAG_REQUEST':
      return {
        ...state,
        checkedTags: state.checkedTags.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};

const tagsReducer = (
  state = {
    tags: []
  },
  action
) => {
  switch (action.type) {
    case 'GET_TAGS_SUCCESS':
      return {
        ...state,
        tags: action.payload
      };
    case 'CREATE_TAG_SUCCESS':
      return {
        ...state,
        tags: [
          ...state.tags,
          action.payload
        ]
      }
    case 'DELETE_TAG_REQUEST':
      return {
        ...state,
        tags: state.tags.filter(t => t.id !== action.payload)
      };
    default:
      return state;
  }
};

const songsReducer = (
  state = {
    hasLoaded: false,
    songs: []
  },
  action
) => {
  switch (action.type) {
    case 'ADD_SONG':
    return {
      ...state,
      songs: [action.payload].concat(state.songs)
    };
    case 'LOAD_SONGS':
      return {
        ...state,
        hasLoaded: true,
        songs: action.payload
      };
    case 'ADD_TAG_TO_SONG':
      return {
        ...state,
        songs: state.songs.map(song => {
          return song.id === action.payload.songId
            ? {
              ...song,
              tags: [
                ...song.tags,
                action.payload.tagId
              ]
            }
            : song;
        })
      };
    case 'REMOVE_TAG_FROM_SONG':
      return {
        ...state,
        songs: state.songs.map(song => {
          return song.id === action.payload.songId
            ? {
              ...song,
              tags: song.tags.filter(id => {
                return id !== action.payload.tagId;
              })
            }
            : song;
        })
      };
    case 'DELETE_TAG_REQUEST':
      return {
        ...state,
        songs: state.songs.map(song => {
          return {
            ...song,
            tags: song.tags.filter(id => id !== action.payload)
          };
        })
      };
    default:
      return state;
  }
};

const searchResultsReducer = (
  state = {
    initialSearchMade: false,
    songs: []
  },
  action
) => {
  switch (action.type) {
    case 'POPULATE_SEARCH_RESULTS':
      return {
        ...state,
        initialSearchMade: true,
        songs: action.payload
      };
    case 'ADD_TAG_TO_SONG':
      return {
        ...state,
        songs: state.songs.map(song => {
          return song.id === action.payload.songId
            ? {
              ...song,
              tags: [
                ...song.tags,
                action.payload.tagId
              ]
            }
            : song;
        })
      };
    case 'REMOVE_TAG_FROM_SONG':
      return {
        ...state,
        songs: state.songs.map(song => {
          return song.id === action.payload.songId
            ? {
              ...song,
              tags: song.tags.filter(id => {
                return id !== action.payload.tagId;
              })
            }
            : song;
        })
      };
    case 'DELETE_TAG_REQUEST':
      return {
        ...state,
        songs: state.songs.map(song => {
          return {
            ...song,
            tags: song.tags.filter(id => id !== action.payload)
          };
        })
      };
    default:
      return state;
  }
};



const appReducer = combineReducers({
  navbar: navbarReducer,
  tagsPanel: tagsPanelReducer,
  tags: tagsReducer,
  songs: songsReducer,
  searchResults: searchResultsReducer,
});

const rootReducer = (state, action) => {
  if (action === 'SIGN_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
