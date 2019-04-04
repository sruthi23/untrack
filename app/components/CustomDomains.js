// @flow
import React, { Component } from 'react';
import { Layout } from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

import db from '../utils/db';

export default class CustomDomains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'assets/angry.svg',
      text: 'Shoot! You are being spied.'
    };
  }

  componentDidMount() {
    const isRunning = db.get('isRunning').value();
    if (isRunning) {
      this.setState({
        icon: 'assets/cool.svg',
        text: 'Great you are saved from;'
      });
    }
  }

  render() {
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
                    <img src={this.state.icon} width="80" />
                    <h1>{this.state.text}</h1>
                  </div>
                </Layout.Col>
              </Layout.Row>
              <div className="cards">
                <Layout.Row gutter="20" justify="space-around" type="flex">
                  <Layout.Col span="12">
                    <div className="grid-content img">
                      <img src="assets/spy.svg" width="80" className="img" />
                      <p>1635 General trackers</p>
                    </div>
                  </Layout.Col>
                  <Layout.Col span="12" offset="1">
                    <div className="grid-content img">
                      <img src="assets/gambling.svg" width="80" />
                      <p>976 Gambling websites</p>
                    </div>
                  </Layout.Col>
                </Layout.Row>

                <Layout.Row gutter="20" justify="space-around" type="flex">
                  <Layout.Col span="12">
                    <div className="grid-content img">
                      <img src="assets/sex.svg" width="80" />
                      <p>345 Porn websites</p>
                    </div>
                  </Layout.Col>

                  <Layout.Col span="12" offset="1">
                    <div className="grid-content img">
                      <img src="assets/social.svg" width="80" />
                      <p>564 Social Media</p>
                    </div>
                  </Layout.Col>
                </Layout.Row>
              </div>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
