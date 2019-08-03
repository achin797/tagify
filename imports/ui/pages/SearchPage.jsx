import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout';
import Typography from 'antd/lib/typography';
import notification from 'antd/lib/notification';
import WrappedSearchForm from "../components/WrappedSearchForm";
import TagsPanel from "../components/TagsPanel";
import {
  getTagsRequest,
  getTagsSuccess,
  getTagsFailure
} from '../actions';
import SearchResults from "../components/SearchResults";

const {Title} = Typography;

class SearchPage extends Component {
  componentDidMount() {
    this.props.getTags();
  }

  render() {

    if (!this.props.initialSearchMade) {
      return (
        <div id="search-page">
          <Layout>
            <Navbar/>
            <Layout>
              <Title>Search</Title>
              <TagsPanel editable/>
              <WrappedSearchForm/>
            </Layout>
          </Layout>
        </div>
      );
    } else {
      return (
        <div id="search-page">
          <Layout>
            <Navbar/>
            <Layout>
              <Title>Search</Title>
              <TagsPanel editable/>
              <WrappedSearchForm/>
              <SearchResults/>
            </Layout>
          </Layout>
        </div>
      );
    }
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