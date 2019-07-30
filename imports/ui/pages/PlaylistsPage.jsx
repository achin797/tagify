import React from 'react';
import Layout from 'antd/lib/layout';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import PlaylistsList from '../components/PlaylistsList';

const { Title } = Typography;

const PlaylistsPage = ({
                  }) => (
    <div id="playlists-page">
        <Layout>
            <Navbar />
            <Layout>
                <TagsPanel />
                <Divider />
                <Title>Playlists</Title>
                <PlaylistsList />
            </Layout>
        </Layout>
    </div>
);

export default PlaylistsPage;