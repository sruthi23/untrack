// @flow
import React, { Component } from 'react';
import { Layout, Icon } from 'element-react';
import { connect } from 'react-redux';
import Head from './Head';
import LeftMenu from './LeftMenu';

import db from '../utils/db';

function IsActiveButton() {
  // return <Icon className="el-icon-circle-check" />;
  return <></>;
}

class CustomDomains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        unified: true,
        fakenews: false,
        gambling: false,
        porn: false,
        social: false
      }
    };
  }

  componentDidMount() {
    const config = db.get('config').value();
    this.setState({ config });
  }

  render() {
    const { isRunning } = this.props;
    return (
      <div className="container">
        <Layout.Row className="grid">
          <Layout.Col span="6">
            <div className="grid-content home-left">
              <LeftMenu />
            </div>
          </Layout.Col>
          <Layout.Col span="18">
            <Head />

            <div className="grid-content home-right welcome">
              <Layout.Row gutter="20">
                <Layout.Col span="24">
                  <div className="grid-content masthead">
                    <img
                      src={isRunning ? 'assets/cool.svg' : 'assets/angry.svg'}
                      width="80"
                    />
                    <h1>
                      {isRunning
                        ? ' Great you are saved from;'
                        : ' Shoot! You are being spied.'}
                    </h1>
                  </div>
                </Layout.Col>
              </Layout.Row>
              <div className="cards">
                <Layout.Row gutter="20" justify="space-around" type="flex">
                  <Layout.Col span="12">
                    <div className="grid-content img">
                      {this.state.config.unified && <IsActiveButton />}
                      <img src="assets/spy.svg" width="80" className="img" />
                      <p>38k+ General</p>
                    </div>
                  </Layout.Col>
                  <Layout.Col span="12" offset="1">
                    <div className="grid-content img">
                      {this.state.config.gambling && <IsActiveButton />}

                      <img src="assets/gambling.svg" width="80" />
                      <p>2k+ Gambling</p>
                    </div>
                  </Layout.Col>
                </Layout.Row>

                <Layout.Row gutter="20" justify="space-around" type="flex">
                  <Layout.Col span="12">
                    <div className="grid-content img">
                      {this.state.config.porn && <IsActiveButton />}

                      <img src="assets/sex.svg" width="80" />
                      <p>12k+ Porn</p>
                    </div>
                  </Layout.Col>

                  <Layout.Col span="12" offset="1">
                    <div className="grid-content img">
                      {this.state.config.social && <IsActiveButton />}

                      <img src="assets/social.svg" width="80" />
                      <p>2k+ Social Media</p>
                    </div>
                  </Layout.Col>
                </Layout.Row>

                <Layout.Row gutter="20" justify="space-around" type="flex">
                  <Layout.Col span="12">
                    <div className="grid-content img">
                      {this.state.config.fakenews && <IsActiveButton />}
                      <img src="assets/fake.svg" width="80" />
                      <p>1k+ Fakenews</p>
                    </div>
                  </Layout.Col>
                  <Layout.Col span="12" offset="1" className="notacard">
                    <div className="grid-content img" />
                  </Layout.Col>
                </Layout.Row>

                <small>
                  From a total of{' '}
                  <a
                    href="https://github.com/StevenBlack/hosts#list-of-all-hosts-file-variants"
                    target="_blank"
                  >
                    55,934
                  </a>{' '}
                  . List manitained by{' '}
                  <a
                    href="https://github.com/StevenBlack/hosts"
                    target="_blank"
                  >
                    StevenBlack/hosts
                  </a>
                </small>
              </div>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isRunning: state.untrack.isRunning
});

export default connect(
  mapStateToProps,
  null
)(CustomDomains);
