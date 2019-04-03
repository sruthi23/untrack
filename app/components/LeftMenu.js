// @flow
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Notification } from 'element-react';

import routes from '../constants/routes';
import db from '../utils/db';

const shell = require('shelljs');
const sudo = require('sudo-prompt');

const options = {
  name: 'Untrack'
};

export default class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOn: 'toggle off'
    };
    this.toggleUntrack = this.toggleUntrack.bind(this);
    this.notifyErr = this.notifyErr.bind(this);
    this.notifySucess = this.notifySucess.bind(this);
  }

  notifyErr() {
    Notification.error({
      title: 'Error',
      message: 'You havent authenticated'
    });
  }

  notifySucess() {
    Notification({
      title: 'Success',
      message: 'Untrack is running',
      type: 'success'
    });
  }

  notifyStop() {
    Notification({
      title: 'Warning',
      message: 'Untrack is stopped',
      type: 'warning'
    });
  }

  componentDidMount() {
    const isRunning = db.get('isRunning').value();
    const toggleArg = isRunning ? 'on' : 'off';

    this.setState({ isOn: `toggle ${toggleArg}` });
  }

  toggleUntrack() {
    const isRunning = db.get('isRunning').value();
    const toggleArg = isRunning ? 'off' : 'on';
    console.log(isRunning, toggleArg, !!isRunning);
    sudo.exec(
      `sh app/scripts/toggle.sh ${toggleArg}`,
      options,
      (error, stdout, stderr) => {
        if (error) {
          this.notifyErr();
        } else {
          db.set('config.initial', false).write();
          db.set('isRunning', !isRunning).write();
          this.setState({ isOn: `toggle ${isRunning ? 'off' : 'on'}` });
          isRunning ? this.notifyStop() : this.notifySucess();
        }
      }
    );
  }

  render() {
    return (
      <div className="leftmenu">
        <div className="toggleContainer">
          <div className="clear" />
          <div className="toggleWrapper" onClick={this.toggleUntrack}>
            <label className={this.state.isOn} htmlFor="dn">
              <span className="toggle__handler" />
            </label>
          </div>
        </div>
        <div className="navContainer">
          <NavLink to={routes.COUNTER} activeClassName="active">
            Settings
          </NavLink>
          <NavLink to={routes.CUSTOMDOMAINS} activeClassName="active">
            Filter List
          </NavLink>
          <NavLink to={routes.WHITELIIST} activeClassName="active">
            Whitelist
          </NavLink>
          <NavLink to={routes.ABOUT} activeClassName="active">
            About
          </NavLink>
        </div>
      </div>
    );
  }
}
