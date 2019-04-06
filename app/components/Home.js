// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Carousel, Button } from 'element-react';
import routes from '../constants/routes';
import { initUntrack, copyScripts } from '../utils';

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

function ContinueLink() {
  return (
    <Link to={routes.CUSTOMDOMAINS} className="continueLink">
      Continue...
    </Link>
  );
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false
    };
  }

  componentDidMount() {
    copyScripts();
    initUntrack().then(() => {
      this.setState({
        done: true
      });
    });
  }

  render() {
    return (
      <div className="container">
        <Layout.Row>
          <Layout.Col span="12">
            <div className="grid-content centered home-left">
              <img src="assets/icon.png" width="200" alt="Untrack" />
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
              {this.state.done && <ContinueLink />}
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
