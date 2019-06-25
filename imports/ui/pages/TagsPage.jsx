import React from 'react';
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout';
import Typography from 'antd/lib/typography';
import TagsPanel from '../components/TagsPanel';

const { Title } = Typography;

const TagsPage = () => (
  <div id="tags-page">
    <Layout>
      <Navbar />
      <Layout>
        <Title>Tags</Title>
        <TagsPanel editable />
      </Layout>
    </Layout>
  </div>
);

export default TagsPage;
