Users = new Mongo.Collection('Users');

Meteor.methods({
  getUserTags: userSpotifyId => {
    const user = Users.findOne({ 'userSpotifyId': userSpotifyId });
    if (user) {
      return user.tags;
    } else {
      Users.insert({ 'userSpotifyId': userSpotifyId, tags: [] });
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
  }
});
