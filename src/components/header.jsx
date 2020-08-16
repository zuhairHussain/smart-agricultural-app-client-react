import React from 'react';
import { history } from '../history';

function Header(props) {
    const logOut = () => {
        localStorage.removeItem('user');
        history.push('/login');
    }
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid header-fluid">
                    <a className="navbar-brand mr-auto" href="/">
                        SMART AGRICULTURAL APP
                </a>
                    {!props.hideLogout ? <button type="button" className="btn btn-outline-secondary" onClick={() => logOut()}>Logout</button> : ""}
                </div>
            </nav>
        </header>
    )
}
export default Header;