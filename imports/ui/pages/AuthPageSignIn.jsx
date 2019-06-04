import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Button from 'antd/lib/button';

const { Title } = Typography;

const AuthPageSignIn = () => (
  <div id="auth-page-sign-in">
    <Row>
      <Col span={24}>
        <Title>Tags for everyone.</Title>
        <Title level={4}>Millions of songs. No playlists needed.</Title>
      </Col>
      <Col span={24}>
        <Button shape="round" size="large" type="primary">Log in with Spotify</Button>
      </Col>
    </Row>
  </div>
);

export default AuthPageSignIn;
