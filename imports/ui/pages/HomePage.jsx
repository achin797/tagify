import React, {Component} from 'react';
import Layout from 'antd/lib/layout';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';
import Icon from 'antd/lib/icon';
import Input from "antd/lib/input";
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import SongList from '../components/SongList';
import {connect} from "react-redux";
import {getTagsFailure, getTagsRequest, getTagsSuccess} from "../actions";
import notification from "antd/lib/notification";

const { Title } = Typography;

class HomePage extends Component{

  constructor(props) {
    super(props);
    this.state = {filterText: ""};
  }

  componentDidMount() {
    this.props.getTags();
  }

  updateFilter(filter) {
    this.setState({
      filterText: filter
    })
  }

  render(){
        return (
            <div id="home-page">
                <Layout>
                    <Navbar />
                    <Layout>
                        <span>
                          <TagsPanel />
                        </span>
                        <Divider />
                        <Title>Liked Songs</Title>
                        <Input
                          placeholder="Filter"
                          allowClear
                          prefix={<Icon type="search" />}
                          onChange={event => {
                            this.updateFilter(event.target.value.toLowerCase());
                          }}
                        />
                        <SongList filterText={this.state.filterText}/>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    checkedTags: state.tagsPanel.checkedTags,
    songs: state.songs.songs,
    tags: state.tags.tags,
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
)(HomePage);
