import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';

const { Title } = Typography;

const NotFoundPage = () => (
  <div id="not-found-page">
    <Row>
      <Col span={24}>
        <Title level={3}>The page you're looking for could not be found.</Title>
      </Col>
    </Row>
  </div>
);

export default NotFoundPage;
