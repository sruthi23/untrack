// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Checkbox, Form, Notification } from 'element-react';
import { connect } from 'react-redux';
import Head from './Head';
import LeftMenu from './LeftMenu';
import UpdateDatabase from './UpdateDatabase';

import { getHost } from '../actions';
import routes from '../constants/routes';
import db from '../utils/db';

class Configure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: db.get('config').value(),
      form: {}
    };
    this.notify = this.notify.bind(this);
  }

  notify() {
    Notification({
      title: 'Success',
      message: 'Your preferences have been saved.',
      type: 'success'
    });
  }

  componentWillMount() {
    const { config } = this.state;
    const cheklist = this.configFormat(config);
    this.setState({
      form: Object.assign({}, this.state.form, { type: cheklist })
    });
  }

  componentDidMount() {
    const { UpdateTime } = this.props;
    UpdateTime();
  }

  configFormat(config) {
    const cheklist = [];

    Object.keys(config).map((key, index) => {
      if (config[key] === true) {
        cheklist.push(key);
      }
    });
    return cheklist;
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { GetHost } = this.props;
    const { type } = this.state.form;
    const configCopy = Object.assign({}, this.state.config);

    Object.keys(configCopy).map((key, index) => {
      if (type.indexOf(key) > -1) {
        configCopy[key] = true;
      } else {
        configCopy[key] = false;
      }
    });

    this.setState({ config: configCopy }, () => {
      db.set('config', this.state.config).write();
    });
    this.notify();

    const returnPromise = GetHost(this.configFormat(this.state.config));
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
              <Form
                ref="form"
                className="en-US"
                model={this.state.form}
                labelWidth="0"
              >
                <Form.Item prop="type">
                  <Checkbox.Group
                    value={this.state.form.type}
                    onChange={this.onChange.bind(this, 'type')}
                  >
                    <Checkbox
                      label="Unified hosts = (adware + malware)"
                      value="unified"
                      name="type"
                      checked
                      disabled
                    />
                    <Checkbox label="Fakenews" value="fakenews" name="type" />
                    <Checkbox label="Gambling" value="gambling" name="type" />
                    <Checkbox label="Porn" value="porn" name="type" />
                    <Checkbox label="Social" value="social" name="type" />
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <UpdateDatabase />
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  progress: state.untrack.progress,
  updateTime: state.untrack.updateTime
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  UpdateTime: () =>
    dispatch({
      type: 'DOWNLOAD_COMPLETE',
      updateTime: db.get('lastUpdate').value()
    }),
  GetHost: category => dispatch(getHost(category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configure);
