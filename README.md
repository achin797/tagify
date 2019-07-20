# Tagify
Group: Austin Kvaale n0a2b, Mingyu Gao f5k0b, Achintya Chandwani g9i0b

### Who is it for?
Tagify is for Spotify users who find that playlists are too messy and take too many clicks.

### What does Tagify do?
Tagify allows users to add **tags** to songs. Tags are strings and are created by the user. The main goal is to make creating play queues and playlists easier.

### What type of data does Tagify store?
The application will associate various song metadata with unique strings (i.e. "tags"). Users will create these tags and connect the chosen song, or set of songs, to the tag. Songs themselves will not be stored; rather, we will refer to the Spotify song data.

### What can users do with this data?
Users will be able to manage their tags and tagged songs. They will also be able to use the tag data to filter songs and can create playlists and play queues based on tags.

### What are some additional functionality we might add based on time constraints?
A visualizer for music would be nice to have. Also, suggested tags based on past user tag choices.

## Project task requirements

### Minimal requirements

- Authenticate with Spotify login
- Create a tag
- Add/remove/edit a tag to a song
- Add/remove/edit a tag to all songs in an existing playlist

### Standard requirements

- Add/remove/edit a tag to all songs by an artist
- Add/remove/edit a tag to all songs in an album
- Create play queue from all songs with a given tag
- Create playlist from all songs with a given tag
- Tag songs that have not been saved by a user (i.e. not in user's library)
- Autofill when entering tag name

### Stretch requirements
- Music Visualizer
- Suggested Tags

## Breaking down a couple of our minimal requirements into smaller tasks

### Authentication:
- Frontend: create UI page with a button that redirects the user to Spotify OAuth
- Backend: implement endpoint to connect to Spotify's authentication

### Create a string tag:
- Frontend: create UI page with a form and submit button
  - validate that the tag does not already exist
- Backend: implement endpoint that adds into the database, under the current user, a new tag object
  - tag object should have an id and a display name

### Add/remove/edit a tag to a song
- Add
  - Frontend: add button to song that opens a dialog to attach an existing tag or to create and attach a new tag
  - Backend: implement endpoint to create a piece of data that ties together a song and a tag
    - Retrieve track data from Spotify, store with associated tag (song and tag both have a unique id, a pairing is therefore a pair of ids)
    - Create string tag if does not exist yet
- Remove
  - Frontend: add button to make the remove tag from song
  - Backend: implement endpoint to remove a pairing of tag id and song id
- Edit
  - Frontend: slow click to modify
    - should not allow to modify for the song individually (i.e. changing a tag for a song should not change that tag for all songs)
  - No backend task, this should use existing add/remove tag endpoints
  
  
  Industry guests description:
Tagify allows users to associate unique strings (“tags”) with their songs. Different combinations of tags can be used to filter the music library and create playlists.
