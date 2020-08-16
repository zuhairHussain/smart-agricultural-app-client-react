import React, { Component } from 'react';
import './dashboard.scss';
import Container from '../../components/container';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container className="parcels-wrapper">
                <h2>Dashboard</h2>

                <div className="row">
                    <div className="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Dashboard;