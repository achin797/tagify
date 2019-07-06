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


