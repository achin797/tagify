# Tagify
Group: Austin Kvaale n0a2b, Mingyu Gao f5k0b, Achintya Chandwani g9i0b

## Basic Contribution Requirements
- Achin: Led the creation and managed the REST API endpoints on the server to make and process requests to Spotify’s API
- Austin: Led most of the backend development
- Ming: Led the UI design development and set up the project for all of us to build on

## Basic Functionality Requirements
Tagify is intended to solve the problem of tagging and managing a Spotify user's music library. Our goal was to implement a tagging system that allows us to create playlists from them.

## Challenges, Learning and Future Directions
A challenge we faced was working with the Spotify web API. Specifically, API endpoints provided to fetch data were very limited by the amount of data we could retrieve (e.g. data for 50 songs per request). Additionally, making too many requests in a short time would yield a timeout. We became more aware of the cost of making requests and the importance of caching. The solution we implemented makes requests repeatedly until all data is loaded, then respond to the front end. We would display a loading screen for the user. Further progress could be made by instead loading the data in chunks and respond to the front end after each chunk, for a more responsive user experience.

## Initiative and Additional Contributions
An additional contribution we made was the inclusion of a UI library. We wanted to achieve a consistent way of styling that would seem familiar to a Spotify user.

### Who is it for?
Tagify is for Spotify users who find that playlists are too messy and take too many clicks.

### What does Tagify do?
Tagify is a third party web-app that allows a user to **tag** songs in his/her Spotify library. The user can then create dynamic playlists based on those tags. 

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
