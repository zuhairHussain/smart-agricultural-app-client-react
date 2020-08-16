import React, { Component } from 'react';
import Header from './header';
import Nav from './nav';

export default class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    render() {
        const { className, container, children, noHeader, withoutNav, hideLogout } = this.props;
        return (
            <React.Fragment>
                {
                    !noHeader ? (<Header toggleNav={() => this.toggleNav()} withoutNav={withoutNav ? withoutNav : ""} hideLogout={hideLogout} />) : ""
                }
                <div className={withoutNav ? 'main-cnt clearfix' : 'main-cnt sidebar-nav-main clearfix'}>
                    {
                        !withoutNav ? (<Nav />) : ""
                    }
                    <div className={`${className ? "main " + className : "main"} ${!withoutNav ? " hasNavbar" : ""}`}>
                        <div className={container ? container : "custom-container"}>
                            {children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}