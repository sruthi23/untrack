// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Checkbox } from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

import routes from '../constants/routes';

export default class Configure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkList: ['Option A', 'Selected and disabled']
    };
  }

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
              <h1>Settings</h1>
              <Checkbox.Group value={this.state.checkList}>
                <Checkbox label="Unified hosts = (adware + malware)" />
                <Checkbox label="fakenews" />
                <Checkbox label="gambling" />
                <Checkbox label="porn" />
                <Checkbox label="social" />
              </Checkbox.Group>

              <Button type="primary">Submit</Button>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
