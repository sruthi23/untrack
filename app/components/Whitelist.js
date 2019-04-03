// @flow
import React, { Component } from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Notification,
  Table
} from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

import db from '../utils/db';

export default class Whitelist extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          label: 'Domain Whitelist',
          prop: 'domain'
        }
      ],
      data: [],
      form: {
        domain: ''
      },
      rules: {
        domain: [
          {
            required: true,
            message: 'Invalid fqdn or ip address format',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              const loclPattern = /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/;
              const locRes = loclPattern.test(value);
              if (locRes) {
                new Error('Invalid fqdn or ip address format');
              } else {
                const patt = /^((\*)[]|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/;
                const k = patt.test(value);
                k
                  ? callback()
                  : callback(new Error('Invalid fqdn or ip address format'));
              }
            }
          }
        ]
      }
    };
    this.notify = this.notify.bind(this);
  }

  notify(domain) {
    Notification({
      title: 'Success',
      message: `${domain} has been added to whitelist.`,
      type: 'success'
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.refs.form.validate(valid => {
      if (valid) {
        const domain = this.state.form.domain;
        db.get('whitelist')
          .pushUnique('domain', { domain })
          .write();
        this.notify(domain);
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.refs.form.resetFields();
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  componentDidMount() {
    const whitelist = db.get('whitelist').value();
    this.setState({ data: whitelist });
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
              <h1>Whitelist</h1>
              <Form
                ref="form"
                model={this.state.form}
                rules={this.state.rules}
                labelWidth="100"
                className="demo-ruleForm"
                labelPosition="top"
              >
                <Form.Item label="IP address or FQDN" prop="domain">
                  <Input
                    type="text"
                    value={this.state.form.domain}
                    onChange={this.onChange.bind(this, 'domain')}
                    autoComplete="off"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                    Submit
                  </Button>
                  <Button onClick={this.handleReset.bind(this)}>Reset</Button>
                </Form.Item>
              </Form>

              <Table
                style={{ width: '100%' }}
                columns={this.state.columns}
                data={this.state.data}
              />
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
