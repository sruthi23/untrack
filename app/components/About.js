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

                <li>
                  <a
                    href="https://github.com/StevenBlack/hosts"
                    target="_blank"
                  >
                    StevenBlack/hosts
                  </a>
                </li>
              </ol>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Why do we use it? It is a long established fact
                that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum
                is that it has a more-or-less normal distribution of letters, as
                opposed to using 'Content here, content here', making it look
                like readable English. Many desktop publishing packages and web
                page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still
                in their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and
                the like).
              </p>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
