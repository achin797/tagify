export function getToggledSongs(songs, checkedTags, andToggle, filterText="") {
  let filteredSongs = checkedTags.length === 0
    ? songs
    : songs.filter(song => {
      if (andToggle) {
        //TODO: simplify statement?
        return checkedTags.every(checkedTag => {
          return song.tags.some(tag => tag === checkedTag)
        })
      } else {
        return song.tags.some(tag => {
          return checkedTags.includes(tag);
        })
      }
    });
  //TODO: Change filter for artist
  filteredSongs = filteredSongs.filter(song => {
    return (song.title.toLowerCase().includes(filterText) ||
      (song.album.toLowerCase().includes(filterText)) ||
      (song.artists.toString().toLowerCase().includes(filterText)))
  });
<<<<<<< HEAD
<<<<<<< HEAD
  return filteredSongs;
}

=======

  console.log(filteredSongs);

  return filteredSongs;
}


export function getPlaylists(playlists) {
  console.log(playlists)
  let filteredPlaylist = [];
  for(x in playlists){
    let tracks = []
    Meteor.call("getPlaylistTracks", (err, response) => {
      tracks = response; });
    console.log(tracks);
    var playlistInfo = {"name": playlists[x].name, "tracks": playlists[x].tracks};
    filteredPlaylist.push(playlistInfo)
  }
  console.log(filteredPlaylist);
  return filteredPlaylist;
}
>>>>>>> Playlist page progress
=======
  return filteredSongs;
}

>>>>>>> Implemented Playlist Page
