// @flow
import React, { Component } from 'react';
import { Layout, Table, AutoComplete, Button } from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

import db from '../utils/db';

const shell = require('shelljs');
const sudo = require('sudo-prompt');

const options = {
  name: 'Untrack'
};

export default class CustomDomains extends Component {
  constructor(props) {
    super(props);
  }

  buttonClick() {
    const isInitial = db.get('initial').value();
    const script = isInitial === true ? 'init.sh' : 'reset.sh';
    sudo.exec(`sh app/scripts/${script}`, options, (error, stdout, stderr) => {
      if (error) throw error;
      console.log(`stdout: ${stdout}`);
      db.set('initial', false).write();
    });
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
              <h1>Filter List</h1>

              <Button type="primary" onClick={this.buttonClick.bind(this)}>
                Test this
              </Button>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
