import React, {Component} from 'react'
import { connect } from 'react-redux';
import List from 'antd/lib/list';
import TaggableSong from './TaggableSong';

class SearchResults extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const dataSource = this.props.searchResults;

    return (
      <div id="search-results">
        <List
          dataSource={dataSource}
          renderItem={song => <TaggableSong song={song} isSearchedSong={true}/>}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults.songs,
  };
};

export default connect(mapStateToProps, {})(SearchResults);
