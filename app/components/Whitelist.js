// @flow
import React, { Component } from 'react';
import { Layout } from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

export default class Whitelist extends Component {
  render() {
    return (
      <div className="container">
        <Layout.Row>
          <Layout.Col span="6">
            <div className="grid-content home-left">
              <LeftMenu />
            </div>
          </Layout.Col>
          <Layout.Col span="18">
            <Head />

            <div className="grid-content home-right">
              <h1>Whitelist</h1>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
