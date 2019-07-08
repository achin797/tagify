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
  addTaggedSong: (userSpotifyId, tagId, songId) => {
    const songExists = Users.findOne({ 'userSpotifyId': userSpotifyId }).taggedSongs.findOne({ id: songId });
    // const song = user.taggedSongs.findOne({ 'id': songId });
    if (songExists){
        songExists.update({ 'userSpotifyId': userSpotifyId }, {
            $push: { tags: tagId }
        });
    } else {
        Users.update({ 
            'userSpotifyId': userSpotifyId }, {
            $push: { taggedSongs: { id: songId, tags : [tagId] } }
            });
        }
    }
});
