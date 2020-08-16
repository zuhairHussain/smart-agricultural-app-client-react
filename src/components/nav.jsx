import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <nav className="side-nav">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink exact to='/dashboard' className="nav-link" activeClassName="active">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to='/process-parcel' className="nav-link" activeClassName="active">Process Parcels</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to='/parcels' className="nav-link" activeClassName="active">Parcels</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to='/tractors' className="nav-link" activeClassName="active">Tractor</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;