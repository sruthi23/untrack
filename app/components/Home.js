// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Carousel, Button } from 'element-react';
import routes from '../constants/routes';

type Props = {};
const elms = [
  {
    title: 'Untraceable',
    desc:
      'Untrack stops all tracking websites from tracking your online activity.'
  },
  {
    title: 'Crowdsourced',
    desc:
      'The trackng domain list is curated and maintained as an open source project.'
  },
  {
    title: 'Translate',
    desc:
      'If you dont know the width or height, you can use the transform property and a negative translate'
  },
  {
    title: 'Block Level',
    desc:
      'If you have two or more block-level elements that need to be centered horizontally in a row'
  }
];
export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container">
        <Layout.Row>
          <Layout.Col span="12">
            <div className="grid-content centered home-left">
              <img src="assets/logo.svg" width="120" />
            </div>
          </Layout.Col>
          <Layout.Col span="12">
            <div className="grid-content carousel home-right">
              <Carousel height="150px" arrow="never">
                {elms.map((item, index) => (
                  <Carousel.Item key={index}>
                    <h1>{item.title}</h1>
                    <h2>{item.desc}</h2>
                  </Carousel.Item>
                ))}
              </Carousel>
              <Link to={routes.COUNTER} className="continueLink">
                Continue...
              </Link>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
