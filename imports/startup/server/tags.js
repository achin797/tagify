Users = new Mongo.Collection('Users');

Meteor.methods({
  getUserTags: userSpotifyId => {
    const user = Users.findOne({ 'userSpotifyId': userSpotifyId });
    if (user) {
      return user.tags;
    } else {
      Users.insert({ 'userSpotifyId': userSpotifyId, tags: [], taggedSongs: [] });
      return [];
    }
  },
  createTag: (userSpotifyId, displayName) => {
    const tag = {
      id: Date.now(),
      displayName
    };
    Users.update({ 'userSpotifyId': userSpotifyId }, {
      $push: { tags: tag }
    });
    return tag;
  },
  deleteTag: (userSpotifyId, tagId) => {
    Users.update({ 'userSpotifyId': userSpotifyId }, {
      $pull: { tags: { id: tagId } }
    });
  },
  
  addSongTag: (userSpotifyId, tagId, songId) => {
    const songExists = Users.findOne({ 'userSpotifyId': userSpotifyId, "taggedSongs.id": songId });
    if (songExists){
        Users.update({ 'userSpotifyId': userSpotifyId, "taggedSongs.id": songId }, {
            $push: { "taggedSongs.$.tags": tagId }
        });
    } else {
        Users.update({ 
            'userSpotifyId': userSpotifyId }, {
            $push: { taggedSongs: { id: songId, tags : [tagId] } }
            });
        }
    },

  removeSongTag: (userSpotifyId, tagId, songId) => {
    const songExists = Users.findOne({ 'userSpotifyId': userSpotifyId, "taggedSongs.id": songId });
    if (songExists){
      console.log("yup");
      Users.update({ 'userSpotifyId': userSpotifyId, "taggedSongs.id": songId }, {
          $pull: { "taggedSongs.$.tags": tagId }
      });
      const songHasTag = Users.findOne({ 'userSpotifyId': userSpotifyId, "taggedSongs.id": songId,  "taggedSongs.$songID.tags": [] } );
      console.log(songHasTag);

      if(songHasTag){
        console.log("nope");
        Users.update({ 
          'userSpotifyId': userSpotifyId }, {
          $pull: { taggedSongs: { id: songId } }
          });
      }
    }
     
  }


});
