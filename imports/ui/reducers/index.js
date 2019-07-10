import { combineReducers } from 'redux';

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const id = idGenerator();
const songs = [];
songs.push({
  id: id.next().value,
  title: 'Intergalactic',
  artist: 'Beastie Boys',
  album: 'Hello Nasty',
  tags: []
});
songs.push({
  id: id.next().value,
  title: 'Flamingo',
  artist: 'Kero Kero Bonito',
  album: 'shh#ffb6c1',
  tags: []
});
songs.push({
  id: id.next().value,
  title: 'Price Tag',
  artist: 'Jessie J ft. B.o.B',
  album: 'Who You Are',
  tags: []
});
songs.push({
  id: id.next().value,
  title: `God's Plan`,
  artist: 'Drake',
  album: 'Scorpion',
  tags: []
});
songs.push({
  id: id.next().value,
  title: 'Outside with the Cuties',
  artist: 'Frankie Cosmos',
  album: 'Next Thing',
  tags: []
});
songs.push({
  id: id.next().value,
  title: 'Lose Yourself',
  artist: 'Eminem',
  album: '8 Mile',
  tags: []
});

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
    songs
  },
  action
) => {
  switch (action.type) {
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

export default combineReducers({
  tagsPanel: tagsPanelReducer,
  tags: tagsReducer,
  songs: songsReducer
});
