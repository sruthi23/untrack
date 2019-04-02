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

    this.state = {
      columns: [
        {
          type: 'expand',
          expandPannel(data) {
            return (
              <div>
                <p>State: {data.state}</p>
                <p>City: {data.city}</p>
                <p>Address: {data.address}</p>
                <p>Zip: {data.zip}</p>
              </div>
            );
          }
        },
        {
          label: 'Date',
          prop: 'date'
        },
        {
          label: 'Name',
          prop: 'name'
        },
        {
          label: 'Actions',
          prop: 'state'
        }
      ],
      data: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }
      ],

      restaurants: [
        { value: 'vue', address: 'https://github.com/vuejs/vue' },
        { value: 'element', address: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', address: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', address: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', address: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', address: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', address: 'https://github.com/babel/babel' }
      ],
      value1: '',
      value2: ''
    };
  }

  querySearch(queryString, cb) {
    const { restaurants } = this.state;
    const results = queryString
      ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
    cb(results);
  }

  createFilter(queryString) {
    return restaurant =>
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  }

  handleSelect(item) {}

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
