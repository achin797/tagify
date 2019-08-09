Meteor.methods({
  getUserTags: userId => {
    const user = Meteor.users.findOne(userId);
    if (user.tags === undefined) {
      Meteor.users.update(userId, {
        $set: { tags: [], taggedSongs: [], taggedPlaylists: [] }
      });
    }
    return user.tags || [];
  },
  createTag: (userId, displayName) => {
    const tag = {
      id: Date.now(),
      displayName
    };
    Meteor.users.update(userId, {
      $push: { tags: tag }
    });
    return tag;
  },
  deleteTag: (userId, tagId) => {
    Meteor.users.update(userId, {
      $pull: { tags: { id: tagId } }
    });
    Meteor.users.update(userId, {
      $pull: { taggedSongs: { tags: tagId}}
    })
  },
  addSongTag: (userId, tagId, songId) => {
    if(songId){
      const songExists = Meteor.users.findOne({ "_id": userId, "taggedSongs.id": songId });
      if (songExists){
          // check to see if song is already tagged with the same tag
          const tagExists = songExists.taggedSongs.filter(song => { if (song.id == songId){return true}});
          if(!tagExists[0].tags.includes(tagId)){
            Meteor.users.update({ "_id": userId, "taggedSongs.id": songId }, {
                $push: { "taggedSongs.$.tags": tagId }
            })
          };
      } else {
        if(songId){
          Meteor.users.update( userId , 
            { $push: { taggedSongs: { id: songId, tags : [tagId] } }
              });
          }
        }
        return {songId: songId, tagId: tagId};
    }
  },

  removeSongTag: (userId, tagId, songId) => {
    const songExists = Meteor.users.findOne({ "_id": userId, "taggedSongs.id": songId });
    if (songExists){
      Meteor.users.update({ "_id": userId, "taggedSongs.id": songId }, 
                          {$pull: { "taggedSongs.$.tags": tagId }
                          });
      // // *** Check if song tags are empty. If so, delete the empty array. ***   
      const currUser = Meteor.users.findOne(userId);
      const filteredArray = currUser.taggedSongs.filter(song => {
        if (song.id === songId) {
          if (song.tags.length === 0) {
            return false;
          }
        } return true;
      });      

      if (currUser.taggedSongs != filteredArray){
        Meteor.users.update({ "_id": userId}, 
                          {$set: {"taggedSongs": filteredArray}}
                          );
      }
    }
    return {songId: songId, tagId: tagId};
  },

  addPlaylistTag: (userId, tagId, playlistId) => {
    const playlistExists = Meteor.users.findOne({ "_id": userId, "taggedPlaylists.id": playlistId });
    if (playlistExists){
        Meteor.users.update({ "_id": userId, "taggedPlaylists.id": playlistId }, {
            $push: { "taggedPlaylists.$.tags": tagId }
        });
    } else {
        Meteor.users.update( userId , 
          { $push: { taggedPlaylists: { id: playlistId, tags : [tagId] } }
            });
    }

    let tracks = null;
    do {
      Meteor.call('getPlaylistTracks', playlistId, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          tracks = response;
        }
      })
    } while (tracks == null);

    songIdList = tracks.filter(track => {if(track.track){return true}});
    songIdList = songIdList.map(track => track.track.id);
    tagExists = false;
    // add tag to every song in the playlist
    for(song in songIdList){
      Meteor.call('addSongTag', userId, tagId, songIdList[song]);
    }
    return {playlistId: playlistId, tagId: tagId, tracks: tracks};
  },

  removePlaylistTag: (userId, tagId, playlistId) => {
    const playlistExists = Meteor.users.findOne({ "_id": userId, "taggedPlaylists.id": playlistId });  
    if (playlistExists){
      Meteor.users.update({ "_id": userId, "taggedPlaylists.id": playlistId }, 
                          {$pull: { "taggedPlaylists.$.tags": tagId }
                          });

      // // *** Check if playlist tags are empty. If so, delete the empty array. ***   
      const currUser = Meteor.users.findOne(userId);
      const filteredArray = currUser.taggedPlaylists.filter(playlist => {
        if (playlist.id === playlistId) {
          if (playlist.tags.length === 0) {
            return false;
          }
        } return true;
      });      

      if (currUser.taggedPlaylists != filteredArray){
        Meteor.users.update({ "_id": userId}, 
                          {$set: {"taggedPlaylists": filteredArray}}
                          );
      }
    }

    let tracks = null;
    do {
      Meteor.call('getPlaylistTracks', playlistId, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          tracks = response;
        }
      })
    } while (tracks == null);
    
    songIdList = tracks.filter(track => {if(track.track){return true}});
    songIdList = songIdList.map(track => track.track.id);
    // remove tag from every song in the playlist
    for(song in songIdList){
      Meteor.call('removeSongTag', userId, tagId, songIdList[song]);
    }

    return {playlistId: playlistId, tagId: tagId, tracks: tracks};
  }
});
