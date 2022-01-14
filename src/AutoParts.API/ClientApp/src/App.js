import React, { Component } from 'react';
import { RoutingSetup } from './components/RoutingSetup'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <RoutingSetup />
    );
  }
}
