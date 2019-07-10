Meteor.methods({
  getUserTags: userId => {
    const user = Meteor.users.findOne(userId);
    if (user.tags === undefined) {
      Meteor.users.update(userId, {
        $set: { tags: [] }
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
  }
});
