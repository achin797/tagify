import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navbar from '../components/Navbar';
import Divider from 'antd/lib/divider';
import Layout from 'antd/lib/layout';
import notification from 'antd/lib/notification';
import WrappedSearchForm from "../components/WrappedSearchForm";
import TagsPanel from "../components/TagsPanel";
import {
  getTagsRequest,
  getTagsSuccess,
  getTagsFailure
} from '../actions';
import SearchResults from "../components/SearchResults";

class SearchPage extends Component {
  componentDidMount() {
    this.props.getTags();
  }

  render() {
    return (
      <div id="search-page">
        <Layout>
          <Navbar/>
          <Layout>
            <TagsPanel plain />
            <Divider />
            <WrappedSearchForm/>
            {this.props.initialSearchMade && (<SearchResults/>)}
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialSearchMade: state.searchResults.initialSearchMade,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTags: () => {
      dispatch(getTagsRequest());
      Meteor.call('getUserTags', Meteor.userId(), (err, response) => {
        if (err) {
          dispatch(getTagsFailure());
          notification.error({
            message: 'Fetch Tags Failed',
            description: 'Tags could not be fetched. Please reload the page.'
          });
        } else {
          dispatch(getTagsSuccess(response));
        }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
