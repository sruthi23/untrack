// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

import routes from '../constants/routes';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <Layout.Row gutter="20">
          <Layout.Col span="6">
            <div className="grid-content home-left">
              <LeftMenu />
            </div>
          </Layout.Col>
          <Layout.Col span="18">
            <div className="grid-content home-right">
              <Head />
              <h1>About</h1>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
