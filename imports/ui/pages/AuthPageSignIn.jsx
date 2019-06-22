import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Button from 'antd/lib/button';

const { Title, Paragraph } = Typography;

const scrollToExplanation = () => {
  document.getElementById('auth-page-sign-in-explanation').scrollIntoView();
};

const AuthPageSignIn = (props) => (
  <div id="auth-page-sign-in">
    <div>
      <div>
        <Title>Tags for everyone.</Title>
        <Title level={4}>Millions of songs. No playlists needed.</Title>
          <Button
              shape="round"
              size="large"
              type="primary"
              onClick={() => {
                  let options = {
                      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
                      requestPermissions: ['user-read-email'] // Spotify access scopes.
                  };
                  Meteor.loginWithSpotify(options, function (err) {
                      if(err){
                          console.log(err);
                      }
                      else{
                          props.history.push("/home");
                      }
                  });
              }}
          >
              Log in with Spotify
          </Button>
      </div>
      <Button
        type="link"
        onClick={() => scrollToExplanation()}
      >
        How does it work?
      </Button>
    </div>
    <div id="auth-page-sign-in-explanation">
      <div>
        <Title level={3}>
          Create and manage playlists more easily.
        </Title>
        <Paragraph>
          Tagify allows you to add custom tags to songs. It allows you to filter
          and sort by tags, create playlists and play queues containing only
          songs with your chosen tags.
        </Paragraph>
        <Title level={3}>
          Some more stuff.
        </Title>
        <Paragraph>
          More stuffs.
        </Paragraph>
      </div>
    </div>
    <div>
      <Row justify="center" type="flex">
        <Col span={4}>
          <div>Project</div>
          <div>About</div>
          <div>Jobs</div>
        </Col>
        <Col span={4}>
          <div>Communities</div>
          <div>For TAs</div>
          <div>Developers</div>
          <div>Brands</div>
          <div>Investors</div>
          <div>Vendors</div>
        </Col>
        <Col span={4}>
          <div>Useful Links</div>
          <div>Help</div>
          <div>Web player</div>
          <div>Spotify</div>
        </Col>
        <Col span={4} />
      </Row>
      <Row justify="center" type="flex">
        <Col span={11}>
          <span>Legal</span>
          <span>Privacy Center</span>
          <span>Privacy Policy</span>
          <span>Cookies</span>
          <span>About Ads</span>
        </Col>
        <Col span={5}>
          <span>CPSC436I Tagify Group &copy; 2019</span>
        </Col>
      </Row>
    </div>
  </div>
);

export default AuthPageSignIn;
