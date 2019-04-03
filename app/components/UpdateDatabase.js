// @flow
import React, { Component } from 'react';
import { distanceInWordsToNow } from 'date-fns';
import { Notification } from 'element-react';
import db from '../utils/db';
import download from '../utils/Downloader';

export default class UpdateDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: '--',
      progress: ''
    };
    this.updateHostsDatabase = this.updateHostsDatabase.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify() {
    Notification({
      title: 'Success',
      message: 'Hosts database has been updated.',
      type: 'success'
    });
  }

  componentDidMount() {
    this.updateLastUpdate();
  }

  updateHostsDatabase(e) {
    e.preventDefault();

    const userPref = db.get('config').value();
    const catstoFetch = Object.keys(userPref)
      .filter(k => userPref[k])
      .map(String);
    const catsJoined = catstoFetch.join('-').replace('unified-', '');
    const repoUrl = `https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/${catsJoined}/hosts`;

    download(repoUrl, 'app/assets/hosts/user.hosts', (bytes, percent) => {
      const progress = isNaN(bytes) ? '' : `Downloading ${bytes} bytes`;
      this.setState({ progress: `${progress}` });
    }).then(() => {
      db.set('lastUpdate', Date.now()).write();
      this.updateLastUpdate();
      this.notify();
    });
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
          Your local database is updated <b>{this.state.lastUpdate}</b>{' '}
          <a href="#" onClick={this.updateHostsDatabase}>
            update now
          </a>
        </p>
        <p>{this.state.progress}</p>
      </div>
    );
  }
}
