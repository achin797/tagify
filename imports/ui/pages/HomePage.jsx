import React, {Component} from 'react';
import Layout from 'antd/lib/layout';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import SongList from '../components/SongList';
import {Button} from "antd";
import {connect} from "react-redux";

const { Title } = Typography;

class HomePage extends Component{
  render(){
        return (
            <div id="home-page">
                <Layout>
                    <Navbar />
                    <Layout>
                        <span>
                          <TagsPanel />
                          <Button
                            className="generate-playlist-button"
                            type="primary"
                            disabled={this.props.checkedTags.length === 0}
                            onClick={() => this.createPlaylist()}>
                            generate playlist
                          </Button>
                        </span>
                        <Divider />
                        <Title>Liked Songs</Title>
                        <SongList />
                    </Layout>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    checkedTags: state.tagsPanel.checkedTags
  };
};

export default connect(mapStateToProps, {})(HomePage);