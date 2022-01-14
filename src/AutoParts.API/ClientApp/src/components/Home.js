import { Component } from "react";
import { NavMenu } from "./NavMenu";

export class Home extends Component {
    render() {
        return (
            <div>
                <NavMenu />
                <h1>Home</h1>
            </div>
        )
    }
}