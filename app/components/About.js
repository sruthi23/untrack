// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'element-react';
import Head from './Head';
import Support from './Support';

import LeftMenu from './LeftMenu';

import routes from '../constants/routes';

export default class About extends Component {
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
              <h1>About</h1>

              <h2>Untrack</h2>
              <p>
                Untrack is an open source software that stops all tracking
                websites from tracking your online activity. The tracking domain
                list is curated and maintained as an open source project
              </p>
              <p>
                <a href="https://untrack.online" target="_blank">
                  Untrack
                </a>{' '}
                is an open source software from{' '}
                <a href="https://lightrains.com" target="_blank">
                  Lightrains Tech
                </a>{' '}
                under MIT License to protect users privacy online.
              </p>
              <h2>Untrack Open source software</h2>
              <p>
                Untrack Open source software contain the following open source
                software:
              </p>
              <ol className="oslist">
                <li>
                  <a href="https://electronjs.org" target="_blank">
                    Electron
                  </a>
                </li>

                <li>
                  <a href="https://reactjs.org" target="_blank">
                    React
                  </a>
                </li>

                <li>
                  <a href="https://github.com/typicode/lowdb" target="_blank">
                    lowdb
                  </a>
                </li>

                <li>
                  <a href="http://element.eleme.io" target="_blank">
                    element-ui
                  </a>
                </li>
              </ol>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
