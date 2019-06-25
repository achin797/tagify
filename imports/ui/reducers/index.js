import { combineReducers } from 'redux';

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const id = idGenerator();
const tags = [];
tags.push({ id: id.next().value, displayName: 'chill' });
tags.push({ id: id.next().value, displayName: 'shower' });
const songs = [];
songs.push({
  id: id.next().value,
  title: 'Intergalactic',
  artist: 'Beastie Boys',
  album: 'Hello Nasty'
});
songs.push({
  id: id.next().value,
  title: 'Flamingo',
  artist: 'Kero Kero Bonito',
  album: 'shh#ffb6c1'
});
songs.push({
  id: id.next().value,
  title: 'Price Tag',
  artist: 'Jessie J ft. B.o.B',
  album: 'Who You Are'
});
songs.push({
  id: id.next().value,
  title: `God's Plan`,
  artist: 'Drake',
  album: 'Scorpion'
});
songs.push({
  id: id.next().value,
  title: 'Outside with the Cuties',
  artist: 'Frankie Cosmos',
  album: 'Next Thing'
});

const tagsPanelReducer = (
  state = {
    checkedTags: [],
    inputVisible: false,
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
    default:
      return state;
  }
};

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

const songsReducer = (
  state = {
    songs,
    displayedSongs: songs
  },
  action
) => {
  switch (action.payload) {
    default:
      return state;
  }
};

export default combineReducers({
  tagsPanel: tagsPanelReducer,
  tags: tagsReducer,
  songs: songsReducer
});
