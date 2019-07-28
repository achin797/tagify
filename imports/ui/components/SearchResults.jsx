// import React, {Component} from 'react'
// import { connect } from 'react-redux';
// import List from 'antd/lib/list';
// import TaggableSong from './TaggableSong';
// import {loadSongs} from "../actions";
//
// class SongList extends Component{
//   constructor(props){
//     super(props);
//   }
//
//   render(){
//     const dataSource = this.props.searchResults;
//
//     return (
//       <div id="song-list">
//         <List
//           dataSource={dataSource}
//           renderItem={song => <TaggableSong song={song} />}
//         />
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     songs: state.songs.songs,
//     hasLoaded: state.songs.hasLoaded,
//     checkedTags: state.tagsPanel.checkedTags,
//   };
// };
//
// export default connect(mapStateToProps, {loadSongs})(SearchResults);
