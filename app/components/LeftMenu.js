// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes';

export default class LeftMenu extends Component {
  render() {
    return (
      <div className="leftmenu">
        <Link to={routes.COUNTER}>Configure</Link>
        <Link to={routes.HOME}>Home</Link>
      </div>
    );
  }
}
