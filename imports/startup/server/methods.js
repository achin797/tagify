Meteor.methods({
  getUser: userId => {
    const user = Meteor.users.findOne(userId);
    return {
      userDisplayName: user.profile.display_name,
      userAvatarUrl: user.profile.images[0].url
    };
  },
  searchTracks: function (query) {

    // Spotify call.
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.searchTracks(query, {limit: 50});

    // Need to refresh token
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.searchTracks(query, {limit: 50});
    }

    var tracks = response.data.body.tracks.items;

    if (tracks.length === 0){
      throw Meteor.Error("Could not find any tracks with the following search parameters")
    }

    try{
      var updatedTracks = tracks.map(track => {
        var updated_track = {};
        updated_track['title'] = track.name;
        updated_track['id'] = track.id;
        updated_track['artists'] = track.artists.map(artist => {
          return artist.name;
        });
        updated_track['album'] = track.album.name;
        updated_track['tags'] = [];

        var currUserDb = Meteor.users.findOne({"_id": Meteor.userId(), "taggedSongs.id": track.id});
        if (currUserDb) {
          tagIdArray = currUserDb.taggedSongs.filter(song => {
            return song.id === track.id;
          })[0].tags;
          updated_track['tags'] = tagIdArray;
        }

        return updated_track;
      });

      return updatedTracks;
    }
    catch (err) {
      throw new Meteor.Error(err);
    }
  },

  addToUsersLikedSongs: function (songId) {

    var spotifyApi = new SpotifyWebApi();

    var response = spotifyApi.addToMySavedTracks([songId]);

    return response;
  },

  //TODO: Add error case handling and better playlist naming
  createPlaylist: function (playlistName, selectedTracks) {
    if (selectedTracks.length === 0)
      throw new Meteor.Error("Cannot generate empty playlist");

    // Call
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, {public: true});

    // Need to refresh token
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, {public: true});
    }

    // Put songs into the playlist.
    var uris = selectedTracks.map(function (track) {
      return "spotify:track:" + track.id;
    });

    response = spotifyApi.addTracksToPlaylist(Meteor.user().services.spotify.id, response.data.body.id, uris, {});

    return response.data.body;
  },

  getSavedTracks: userId => {
    var spotifyApi = new SpotifyWebApi();

    var offset = 0;
    var tracks = [];

    do {
      var response = spotifyApi.getMySavedTracks({limit: 50, offset: offset});

      if (checkTokenRefreshed(response, spotifyApi)) {
        response = spotifyApi.getMySavedTracks({limit: 50, offset: offset});
      }

      offset += response.data.body.limit;
      tracks = tracks.concat(response.data.body.items);

    } while (response.data.body.next != null);

    var updatedTracks = tracks.map(track => {
      var updated_track = {};
      updated_track['title'] = track.track.name;
      updated_track['id'] = track.track.id;
      updated_track['artists'] = track.track.artists.map(artist => {
        return artist.name;
      });
      updated_track['album'] = track.track.album.name;
      updated_track['tags'] = [];

      // Grab song tags from DB, if any exist:
      var currUserDb = Meteor.users.findOne({"_id": userId, "taggedSongs.id": track.track.id});
      if (currUserDb) {
        tagIdArray = currUserDb.taggedSongs.filter(song => {
          return song.id === track.track.id;
        })[0].tags;
        updated_track['tags'] = tagIdArray;
      }

      return updated_track;
    });

    return updatedTracks;
  },

  getSavedPlaylists: userId => {
    var spotifyApi = new SpotifyWebApi();
    var offset = 0;
    var playlists = [];

    // spotify has an offset and limit. The first call retrieves the first 20 items
    // then we update the offset and make another call while there are items to fetch
    do {
      var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {offset: offset});

      if (checkTokenRefreshed(response, spotifyApi)) {
        response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {offset: offset});
      }
      offset += response.data.body.limit;
      playlists = playlists.concat(response.data.body.items);

    } while (response.data.body.next != null);

    var updatedPlaylists = playlists.map(playlist => {
            var updated_Playlist = {};
            updated_Playlist['title'] = playlist.name;
            updated_Playlist['id'] = playlist.id;
            updated_Playlist['tracks'] = playlist.tracks;
            updated_Playlist['tags'] = [];

            // Grab song tags from DB, if any exist: 
            var currUserDb = Meteor.users.findOne({"_id": userId, "taggedPlaylists.id": playlist.id });

            if(currUserDb){
                tagIdArray = currUserDb.taggedPlaylists.filter( taggedPlaylist => { 
                    if (taggedPlaylist.id === playlist.id){
                        return true;                    
                    } else{
                        return false;
                    }})[0].tags;
                updated_Playlist['tags'] = tagIdArray;
            }
            return updated_Playlist;
        });

        return updatedPlaylists;
    },

    getPlaylistTracks: playlistId => {
        var spotifyApi = new SpotifyWebApi();
        var offset = 0;
        var tracks = [];

        do {
            var response = spotifyApi.getPlaylistTracks(Meteor.user().services.spotify.id, playlistId, {offset: offset}); 
            if (checkTokenRefreshed(response, spotifyApi)) {
                response = spotifyApi.getPlaylistTracks(Meteor.user().services.spotify.id, playlistId, {offset: offset}); 
            }
            offset += response.data.body.limit;
            tracks = tracks.concat(response.data.body.items);
        } while(response.data.body.next!=null);
        return tracks;
    } 
});

var checkTokenRefreshed = function (response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
};
