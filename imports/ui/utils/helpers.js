export function getToggledSongs(songs, checkedTags, andToggle) {
  return checkedTags.length === 0
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
}