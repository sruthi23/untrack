// @flow
import React, { Component } from 'react';
import { distanceInWordsToNow } from 'date-fns';
import db from '../utils/db';

export default class UpdateDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: '--'
    };
    this.updateHostsDatabase = this.updateHostsDatabase.bind(this);
  }

  componentDidMount() {
    this.updateLastUpdate();
  }

  updateHostsDatabase(e) {
    e.preventDefault();
    db.set('lastUpdate', Date.now()).write();
    this.updateLastUpdate();
  }

  updateLastUpdate() {
    const lastUpdate = db.get('lastUpdate').value();
    const lastUpdateDays = distanceInWordsToNow(lastUpdate, {
      addSuffix: true
    });
    this.setState({ lastUpdate: lastUpdateDays });
  }

  render() {
    return (
      <div className="updatedatabase">
        <h2>Update hosts database</h2>
        <p>
          Your local database is is updated <b>{this.state.lastUpdate}</b>{' '}
          <a href="#" onClick={this.updateHostsDatabase}>
            update now
          </a>
        </p>
      </div>
    );
  }
}
