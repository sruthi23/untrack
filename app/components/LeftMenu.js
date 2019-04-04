// @flow
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Notification } from 'element-react';
import { connect } from 'react-redux';

import routes from '../constants/routes';
import db from '../utils/db';

const shell = require('shelljs');
const sudo = require('sudo-prompt');

const options = {
  name: 'Untrack'
};

class LeftMenu extends Component {
  constructor(props) {
    super(props);
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

  toggleUntrack = () => {
    const { ToggleUntrack } = this.props;
    const isRunning = db.get('isRunning').value();
    const toggleArg = isRunning ? 'on' : 'off';

    sudo.exec(
      `sh app/scripts/toggle.sh ${toggleArg}`,
      options,
      (error, stdout, stderr) => {
        if (error) {
          this.notifyErr();
        } else {
          db.set('config.initial', false).write();
          db.set('isRunning', !isRunning).write();
          ToggleUntrack(!isRunning);
          isRunning ? this.notifyStop() : this.notifySucess();
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

const mapStateToProps = state => {
  return {
    isRunning: state.untrack.isRunning
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  ToggleUntrack: isRunning =>
    dispatch({
      type: 'TOGGLE_UNTRACK',
      isRunning: isRunning
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);
