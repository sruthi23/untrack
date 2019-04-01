// @flow
import React, { Component } from 'react';
import routes from '../constants/routes';

export default class Head extends Component {
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
      <div className="headbar">
        <img
          src={this.state.statusicon}
          onClick={this.toggleClick}
          width="80"
        />
      </div>
    );
  }
}
