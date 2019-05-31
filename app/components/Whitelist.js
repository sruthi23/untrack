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

import {
  userDataPath,
  //  defaultHosts,
  usersHosts,
  getScriptsPath
} from '../utils';

const replace = require('replace-in-file');
const sudo = require('sudo-prompt');
const path = require('path');

const options = {
  name: 'Untrack'
  //icns: path.join(process.resourcesPath, 'app.icns')
};

export default class Whitelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state: false,
      scriptPath: path.join(getScriptsPath, '/domain.sh'),
      columns: [
        {
          label: 'Domain Whitelist',
          prop: 'domain'
        },
        {
          label: 'Delete',
          prop: 'domain',
          width: 100,
          render: (data, column, index) => (
            <Button
              type="text"
              onClick={this.removeItem.bind(this, data.domain, index)}
            >
              delete
            </Button>
          )
        }
      ],
      tableData: [],
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
    this.domainRemoved = this.domainRemoved.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem = (domain, index) => {
    const array = [...this.state.tableData]; // make a separate copy of the array
    //  const options = { name: 'Electron' };
    console.log(this.state.scriptPath, userDataPath, domain);
    sudo.exec(
      `bash ${this.state.scriptPath} "${userDataPath}" ${domain}`,
      options,
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.log(error, stderr, stdout);
        } else {
          array.splice(index, 1);
          this.setState({ tableData: array }, () => {
            db.get('whitelist')
              .remove({ domain })
              .write();
            this.domainRemoved(domain);
            this.refs.form.resetFields();
          });
        }
      }
    );
  };
  addDomain() {
    //const options = { name: 'Electron' };
    const array = [...this.state.tableData];
    const domain = this.state.form.domain;
    sudo.exec(
      `bash ${this.state.scriptPath} "${userDataPath}" ${domain}`,
      options,
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.log(error, stderr, stdout);
        } else {
          let result = db
            .get('whitelist')
            .find({ domain: domain })
            .value();
          result = result ? result : 0;
          if (result === 0) {
            this.domainAdded(domain);
            this.refs.form.resetFields();
          } else {
            const index = array.findIndex(x => x.domain === domain);
            array.splice(index, 1);
            this.setState({ tableData: array }, () => {
              db.get('whitelist')
                .remove({ domain })
                .write();
              this.domainAdded(domain);
              this.refs.form.resetFields();
            });
          }
        }
      }
    );
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { domain } = this.state.form;
    const scriptPath = path.join(getScriptsPath, '/update.sh');
    const regex = new RegExp(`.*\\b(${domain})\\b.*\n`, 'gi');
    console.log('usersHosts', usersHosts, regex, scriptPath);
    const opt = { name: 'untrack' };
    const options = {
      files: usersHosts,
      from: regex,
      to: ''
    };
    try {
      const changes = await replace(options);
      console.log('Modified files:', changes.join(', '));
      sudo.exec(
        `bash ${scriptPath} "${userDataPath}" ${domain}`,
        opt,
        (error, stdout, stderr) => {
          if (error || stderr) {
            console.log(error, stderr, stdout);
          }
        }
      );
    } catch (error) {
      console.error('Error occurred:', error);
    }

    const res = this.refs.form.validate(valid => {
      if (valid) {
        const { domain } = this.state.form;
        this.refs.form.resetFields();
        this.setState(
          {
            tableData: [
              ...this.state.tableData,

              {
                domain
              }
            ]
          },
          () => {
            db.get('whitelist')
              .pushUnique('domain', { domain })
              .write();
            this.notify(domain);
          }
        );
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  componentDidMount() {
    this.updateWhitelist();
  }

  notify(domain) {
    Notification({
      title: 'Success',
      message: `${domain} has been added to whitelist.`,
      type: 'success'
    });
  }

  domainRemoved(domain) {
    Notification({
      title: 'Removed',
      message: `${domain} has been removed from whitelist.`,
      type: 'info'
    });
  }

  domainAdded(domain) {
    Notification({
      title: 'Removed',
      message: `${domain} has been blocked.`,
      type: 'info'
    });
  }

  updateWhitelist = () => {
    const whitelist = db.get('whitelist').value();
    this.setState({ tableData: whitelist }, () => {
      console.log(this.state.tableData);
    });
  };

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
              <h1>Domain Management</h1>
              <Form
                ref="form"
                model={this.state.form}
                rules={this.state.rules}
                labelWidth="100"
                className="demo-ruleForm"
                labelPosition="top"
                inline
              >
                <Form.Item prop="domain">
                  <Input
                    type="text"
                    placeholder="IP address or FQDN"
                    value={this.state.form.domain}
                    onChange={this.onChange.bind(this, 'domain')}
                    autoComplete="off"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                    Search
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.addDomain.bind(this)}>
                    ADD
                  </Button>
                </Form.Item>
              </Form>

              <Table
                style={{ width: '100%' }}
                columns={this.state.columns}
                data={this.state.tableData}
                emptyText="Empty"
              />
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
