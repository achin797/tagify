Meteor.methods({
  getUser: userId => {
    const user = Meteor.users.findOne(userId);
    return {
      userDisplayName: user.profile.display_name,
      userAvatarUrl: user.profile.images[0].url
    };
  },
    typeaheadTracks: function(query, options) {
        options = options || {};

        // guard against client-side DOS: hard limit to 50
        if (options.limit) {
            options.limit = Math.min(6, Math.abs(options.limit));
        } else {
            options.limit = 6;
        }

        // Spotify call.
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.searchTracks(query, { limit: options.limit });

        // Need to refresh token
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.searchTracks(query, { limit: options.limit });
        }

        return response.data.body.tracks.items;
    },

    //TODO: Add error case handling and better playlist naming
    createPlaylist: function(playlistName, selectedTracks) {
        if (selectedTracks.length === 0)
          throw new Meteor.Error("Cannot generate empty playlist");

        // Call
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, { public: true });

        // Need to refresh token
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, { public: true });
        }

        // Put songs into the playlist.
        var uris = selectedTracks.map(function(track) {
            return "spotify:track:"+track.id;
        });

        response = spotifyApi.addTracksToPlaylist(Meteor.user().services.spotify.id, response.data.body.id, uris, {});

        return response.data.body;
    },

    getSavedTracks: userId => {
        var spotifyApi = new SpotifyWebApi();

        var offset = 0;
        var tracks = [];

        do {
            var response = spotifyApi.getMySavedTracks({limit:50, offset:offset});

            if (checkTokenRefreshed(response, spotifyApi)) {
                response = spotifyApi.getMySavedTracks({limit:50, offset:offset});
            }

            offset += response.data.body.limit;
            tracks = tracks.concat(response.data.body.items);

        } while(response.data.body.next!=null);

        var updatedTracks = tracks.map(track => {
            var updated_track = {};
            updated_track['title'] = track.track.name;
            updated_track['id'] = track.track.id;
            updated_track['artists'] = track.track.artists.map(artist => {return artist.name;});
            updated_track['album'] = track.track.album.name;
            updated_track['tags'] = [];
            
            // Grab song tags from DB, if any exist: 
            var currUserDb = Meteor.users.findOne({"_id": userId, "taggedSongs.id": track.track.id });
            if(currUserDb){
                tagIdArray = currUserDb.taggedSongs.filter( song => { 
                    if (song.id === track.track.id){
                        return true;                    
                    } else{
                        return false;
                    }})[0].tags;
                updated_track['tags'] = tagIdArray;
            }

            return updated_track;
        });

        return updatedTracks;
    },

    getSavedPlaylists: function() {
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

        } while(response.data.body.next!=null);

        return playlists;
    },

    getPlaylistTracks: playlistID => {
        var spotifyApi = new SpotifyWebApi();
        let retVal = spotifyApi.getPlaylistTracks(Meteor.user().services.spotify.id, playlistID); 
        console.log(retVal);
        return retVal;
    } 

});


var checkTokenRefreshed = function(response, api) {
    if (response.error && response.error.statusCode === 401) {
        api.refreshAndUpdateAccessToken();
        return true;
    } else {
        return false;
    }
};
