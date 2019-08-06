import React from 'react';
import Layout from 'antd/lib/layout';
import Typography from 'antd/lib/typography';
import Navbar from '../components/Navbar';
import PlaylistsList from '../components/PlaylistsList';

const { Title } = Typography;

const PlaylistsPage = ({
                  }) => (
    <div id="playlists-page">
        <Layout>
            <Navbar />
            <Layout>
                <Title>Playlists</Title>
                <PlaylistsList />
            </Layout>
        </Layout>
    </div>
);

export default PlaylistsPage;