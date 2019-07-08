<<<<<<< HEAD
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
=======
userTags = new Mongo.Collection('userTags');

Meteor.methods({
    
    getUserTags: function(userSpotifyId) {
        if(userTags.findOne({"userSpotifyId": userSpotifyId}, {"_id" : 1})){
            let importedTags = userTags.find(
                {"userSpotifyId": userSpotifyId}, 
                {"tags": 1, _id: 0}).fetch();
            return importedTags[0].tags;
        }
        else{
            userTags.insert({"tags": []}, {"userSpotifyId": userSpotifyId});
            return [];
        }
    },

    createTag: function(userSpotifyId, displayName) {
        userTags.update(
            {'userSpotifyId': userSpotifyId},
            {$push: {"tags": displayName} }
        );
    },

    deleteTag: function(userSpotifyId, tagId) {
        userTags.update(
            {'userSpotifyId': userSpotifyId},
            {$pull: {"tags": tagId} }
            )
    }
})


>>>>>>> 4bfffd2bf3312821520334b0c4ea532424dfe70c
