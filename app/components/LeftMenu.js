// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes';

export default class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusicon: 'assets/on.svg'
    };
    this.toggleClick = this.toggleClick.bind(this);
  }

  toggleClick() {
    if (this.state.statusicon === 'assets/on.svg') {
      this.setState({ statusicon: 'assets/off.svg' });
    } else {
      this.setState({ statusicon: 'assets/on.svg' });
    }
  }

  render() {
    return (
      <div className="leftmenu">
        <div className="toggleContainer">
          <img
            src={this.state.statusicon}
            onClick={this.toggleClick}
            width="80"
          />
        </div>
        <Link to={routes.COUNTER}>Settings</Link>
        <Link to={routes.CUSTOMDOMAINS}>Fileter List</Link>
        <Link to={routes.WHITELIIST}>Whitelist</Link>
        <Link to={routes.ABOUT}>About</Link>
      </div>
    );
  }
}
