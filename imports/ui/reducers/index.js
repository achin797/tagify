import { combineReducers } from 'redux';
import userTags from "./userTags";

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

const homePageState = {
  items : [
      {id : 1, name : "Tag1", songs : ["SongID_10", "SongID_9"]},
      {id : 2, name : "Tag2", songs : ["SongID_2", "SongID_3"]},
      {id : 3, name : "Tag3", songs : ["SongID_4", "SongID_5"]},
      {id : 4, name : "Tag4", songs : ["SongID_6", "SongID_7"]},
      {id : 5, name : "Tag5", songs : ["SongID_8", "SongID_9"]},
      {id : 6, name : "Tag6", songs : ["SongID_10", "SongID_11"]},
      {id : 7, name : "Tag7", songs : ["SongID_10", "SongID_9"]},
      {id : 8, name : "Tag8", songs : ["SongID_2", "SongID_3"]},
      {id : 9, name : "Tag9", songs : ["SongID_4", "SongID_5", "SongID_3"]},
      {id : 10, name : "Tag10", songs : ["SongID_6", "SongID_7"]},
      {id : 11, name : "Tag11", songs : ["SongID_8", "SongID_9"]},
      {id : 12, name : "Tag12", songs : ["SongID_10", "SongID_19"]},
      {id : 13, name : "Tag13", songs : ["SongID_12", "SongID_20","SongID_10", "SongID_19"]},
      {id : 14, name : "Tag14", songs : ["SongID_13", "SongID_21"]},
      {id : 15, name : "Tag15", songs : ["SongID_14", "SongID_22", "SongID_9"]},
      {id : 16, name : "Tag16", songs : ["SongID_15", "SongID_23"]},
      {id : 17, name : "Tag17", songs : ["SongID_16", "SongID_24", "SongID_4"]},
      {id : 18, name : "Tag18", songs : ["SongID_17", "SongID_25", "SongID_6"]},
      {id : 19, name : "Tag19", songs : ["SongID_18", "SongID_26"]}
  ],

  display : {}

}


const homeReducer = (state = homePageState, action) => {
  if (action.type === "HIDE") {

      let newDisplay = {...state.display};
      for (i=0; i < action.songs.length; i++ ){
          if (newDisplay[action.songs[i]] == 1){
              delete newDisplay[action.songs[i]];
          } else{
              newDisplay[action.songs[i]] -= 1;
          }
      }
      return {
          ...state,
          display: newDisplay
      }
  }

  if (action.type === "SHOW") {
      let newDisplay = {...state.display};
      for (i=0; i < action.songs.length; i++ ){
          if(!newDisplay[action.songs[i]]){
              newDisplay[action.songs[i]] = 1;
          } else{
              newDisplay[action.songs[i]] += 1;
          }
      }
      return {
          ...state,
          display: newDisplay
      }
  }

  if (action.type === "ADD") {
      action.id = Math.random();
      action.name = action.input;
      let newItems = [...state.items];
      let pushed = false;
      for (i=0; i < newItems.length; i++){
          if (action.name == newItems[i].name){
              newItems[i].songs.push(action.song);
              pushed = true;
          }
      }
      if (!pushed){
          newItems.push(action);
      }
      return {
          ...state,
          items: newItems
      }
  }
  
  return state;  
}



export default combineReducers({
  tags: tagsReducer,
  modalCreateTag: modalCreateTagReducer,
  home: homeReducer
});
