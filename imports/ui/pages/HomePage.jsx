import React from 'react';
import Layout from 'antd/lib/layout';
import Divider from 'antd/lib/divider';
import Navbar from '../components/Navbar';
import TagsPanel from '../components/TagsPanel';
import SongList from '../components/SongList';

const HomePage = ({
}) => (
  <div id="home-page">
    <Layout>
      <Navbar />
      <Layout>
        <TagsPanel />
        <Divider />
        <SongList />
      </Layout>
    </Layout>
  </div>
);

export default HomePage;
