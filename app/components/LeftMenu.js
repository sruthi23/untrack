// @flow
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Notification } from 'element-react';
import { connect } from 'react-redux';

import routes from '../constants/routes';
import db from '../utils/db';

import {
  userDataPath,
  defaultHosts,
  usersHosts,
  getScriptsPath
} from '../utils';

const path = require('path');
const { ipcRenderer } = require('electron');
const sudo = require('sudo-prompt');

const options = {
  name: 'Untrack'
};

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleUntrack = this.toggleUntrack.bind(this);
    this.notifyErr = this.notifyErr.bind(this);
  }

  notifyErr() {
    Notification.error({
      title: 'Error',
      message: 'You havent authenticated'
    });
  }

  componentDidMount() {
    const { ToggleUntrack } = this.props;
    const isRunning = db.get('isRunning').value();
    ToggleUntrack(isRunning);
    ipcRenderer.send('toggle-untrack', isRunning);
  }

  toggleUntrack = () => {
    const { ToggleUntrack } = this.props;
    const isRunning = db.get('isRunning').value();
    const toggleArg = isRunning ? 'on' : 'off';
    const hostsToActivate = isRunning ? usersHosts : defaultHosts;
    const scriptPath = path.join(getScriptsPath, '/toggle.sh');
    sudo.exec(
      `sh ${scriptPath} ${toggleArg} "${userDataPath}"`,
      options,
      (error, stdout, stderr) => {
        if (error || stderr) {
          this.notifyErr();
        } else {
          db.set('isRunning', !isRunning).write();
          ToggleUntrack(!isRunning);
          ipcRenderer.send('toggle-untrack', !isRunning);
        }
      }
    );
  };

  render() {
    const { isRunning } = this.props;

    return (
      <div className="leftmenu">
        <div className="toggleContainer">
          <div className="clear" />
          <div className="toggleWrapper" onClick={this.toggleUntrack}>
            <label
              className={`toggle ${isRunning ? 'on' : 'off'}`}
              htmlFor="dn"
            >
              <span className="toggle__handler" />
            </label>
          </div>
        </div>
        <div className="navContainer">
          <NavLink to={routes.CUSTOMDOMAINS} activeClassName="active">
            <i className="fas fa-shield-alt" /> Untrack
          </NavLink>
          <NavLink to={routes.WHITELIIST} activeClassName="active">
            <i className="fas fa-user-shield" /> Whitelist
          </NavLink>
          <NavLink to={routes.COUNTER} activeClassName="active">
            <i className="fas fa-tasks" /> Settings
          </NavLink>
          <NavLink to={routes.ABOUT} activeClassName="active">
            <i className="fas fa-info-circle" /> About
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isRunning: state.untrack.isRunning
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ToggleUntrack: isRunning =>
    dispatch({
      type: 'TOGGLE_UNTRACK',
      isRunning
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);
