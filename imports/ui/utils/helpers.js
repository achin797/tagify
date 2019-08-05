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
  return filteredSongs;
}

