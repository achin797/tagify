import React, {Component} from 'react';
import Layout from 'antd/lib/layout';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import SongList from '../components/SongList';

const { Title } = Typography;

class HomePage extends Component{
    render(){
        return (
            <div id="home-page">
                <Layout>
                    <Navbar />
                    <Layout>
                        <TagsPanel />
                        <Divider />
                        <Title>Liked Songs</Title>
                        <SongList />
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default HomePage;
