Meteor.methods({
  getUserTags: userId => {
    const user = Meteor.users.findOne(userId);
    console.log(user.taggedSongs);
    if (user.tags === undefined) {
      Meteor.users.update(userId, {
        $set: { tags: [], taggedSongs: [] }
      });
    }
    return user.tags;
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
  },


  addSongTag: (userId, tagId, songId) => {
    const songExists = Meteor.users.findOne({ "_id": userId, "taggedSongs.id": songId });
    console.log(songExists);
    if (songExists){
        Meteor.users.update({ "_id": userId, "taggedSongs.id": songId }, {
            $push: { "taggedSongs.$.tags": tagId }
        });
    } else {
        Meteor.users.update( userId , 
          { $push: { taggedSongs: { id: songId, tags : [tagId] } }
            });
        }
    },

  removeSongTag: (userId, tagId, songId) => {
    const songExists = Meteor.users.findOne({ "_id": userId, "taggedSongs.id": songId });

    if (songExists){
      Meteor.users.update({ "_id": userId, "taggedSongs.id": songId }, 
                          {$pull: { "taggedSongs.$.tags": tagId }
                          });

      // // *** Check if song tags are empty ***   
      const currUser = Meteor.users.findOne(userId);
      
      const filteredArray = currUser.taggedSongs.filter(song => {
        if (song.id === songId) {
          if (song.tags.length === 0) {
            return false;
          }
        }
        return true;
      });      

      if (currUser.taggedSongs != filteredArray){
        Meteor.users.update({ "_id": userId}, 
                          {$set: {"taggedSongs": filteredArray}}
                          );
      }
    }
  }


});
