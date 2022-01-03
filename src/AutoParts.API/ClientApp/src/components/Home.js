import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { About } from './About';
import { Link } from 'react-router-dom';
import { SignIn } from './SignIn';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.getSecret = this.getSecret.bind(this);
  }

  async getSecret() {
    const response = await fetch('api/account/secret');
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.getSecret}>Get secret</button>
      </div>
    );
  }
}
