// @flow
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
    this.toggleClick = this.toggleClick.bind(this);
  }

  toggleClick() {
    if (this.state.isOn === 'toggle on') {
      this.setState({ isOn: 'toggle off' });
    } else {
      this.setState({ isOn: 'toggle on' });
    }

    sudo.exec('sh app/scripts/init.sh', options, (error, stdout, stderr) => {
      if (error) throw error;
      db.set('config.initial', false).write();
    });
  }

  render() {
    return (
      <div className="leftmenu">
        <div className="toggleContainer">
          <div className="clear" />
          <div className="toggleWrapper" onClick={this.toggleClick}>
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
