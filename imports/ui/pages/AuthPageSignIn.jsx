import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

const { Title, Paragraph } = Typography;

const scrollToExplanation = () => {
  document.getElementById('auth-page-sign-in-explanation').scrollIntoView();
};

const AuthPageSignIn = ({ history, signIn }) => {
  return Meteor.userId()
    ? (<Redirect to="/" />)
    : (
      <div id="auth-page-sign-in">
        <div>
          <div>
            <Title>Tags for everyone.</Title>
            <Title level={4}>Millions of songs. No playlists needed.</Title>
            <Button
              shape="round"
              size="large"
              type="primary"
              onClick={() => signIn(history)}
            >
              Log in with Spotify
            </Button>
          </div>
          <Button
            type="link"
            onClick={() => scrollToExplanation()}
          >
            <div>How does it work?</div>
            <div><Icon type="down" /></div>
          </Button>
        </div>
        <div id="auth-page-sign-in-explanation">
          <div>
            <Title level={3}>
              Connect to your Spotify.
            </Title>
            <Paragraph>
              Use your existing Spotify account to sign in. There is no need to
              create an account or to sign up. Your library of songs will be
              automatically loaded into Tagify.
            </Paragraph>
          </div>
          <div>
            <Title level={3}>
              Create and manage playlists more easily.
            </Title>
            <Paragraph>
              Create tags and add them to your songs. You can then filter your
              music by tags and create playlists containing only songs with
              your chosen tags, with one click.
            </Paragraph>
          </div>
          <div>
            <Title level={3}>
              Tag existing playlists and songs outside your library.
            </Title>
            <Paragraph>
              Tag an entire playlists of yours or search the Spotify database
              for an artist, album or song title.
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
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: history => {
      const signInOptions = {
        showDialog: true,
        requestPermissions: [
          'user-read-email',
          'user-library-read',
          'user-library-modify',
          'playlist-modify-public'
        ]
      };
      Meteor.loginWithSpotify(signInOptions, err => {
        if (err) {
          console.log(err);
        } else {
          history.push('/');
        }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPageSignIn);
