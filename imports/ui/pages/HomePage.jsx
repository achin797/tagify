import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout';

const HomePage = () => (
  <div id="home-page">
    <Layout>
      <Navbar />
    </Layout>
  </div>
);

export default HomePage;
