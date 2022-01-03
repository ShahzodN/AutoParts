import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { About } from "./About";
import { Home } from "./Home";
import { SignIn } from "./SignIn";
import { Person } from "./Person";
import { NavMenu } from "./NavMenu";

export class RoutingSetup extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <div>
                        <NavMenu />
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/person">
                            <Person />
                        </Route>
                    </div>
                </Switch>
            </Router>
        );
    }
}