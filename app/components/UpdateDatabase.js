// @flow
import React, { Component } from 'react';
import { distanceInWordsToNow } from 'date-fns';
import { Notification } from 'element-react';
import db from '../utils/db';
import download from '../utils/Downloader';
import { connect } from 'react-redux';

import { getHost } from '../actions';

class UpdateDatabase extends Component {
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

  updateHostsDatabase(e) {
    e.preventDefault();
    const { GetHost } = this.props;

    const userPref = db.get('config').value();
    const catstoFetch = Object.keys(userPref)
      .filter(k => userPref[k])
      .map(String);

    const returnPromise = GetHost(catstoFetch);
  }

  render() {
    const { progress, updateTime } = this.props;

    return (
      <div className="updatedatabase">
        <h2>Update hosts database</h2>
        <p>
          Your local database is updated{' '}
          <b>{distanceInWordsToNow(updateTime)}</b>{' '}
          <a href="#" onClick={this.updateHostsDatabase}>
            update now
          </a>
        </p>
        <p>{progress}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    progress: state.untrack.progress,
    updateTime: state.untrack.updateTime
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  GetHost: category => dispatch(getHost(category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateDatabase);
