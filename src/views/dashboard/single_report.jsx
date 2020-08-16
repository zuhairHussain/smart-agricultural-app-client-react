import React, { Component } from 'react';
import { userService } from '../../helper/services';
import './dashboard.scss';
import Container from '../../components/container';
import Loader from '../../components/loader';
import { dateFormate } from '../../helper/common';


class SingleReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            processed_parcels: [],
            parcels: []
        }
    }
    componentDidMount() {
        const { params } = this.props.match;

        if (params.id) {
            this.setState({ loading: true });
            userService.getProcessParcelsById(params.id).then(
                data => {
                    if (!data.error) {
                        this.setState({ loading: false, parcels: data.parcel })
                    } else {
                        this.setState({ loading: false, dataError: data.message });
                    }
                },
                error => {
                    this.setState({ loading: false, dataError: error.message });
                }
            );
        }
    }
    generateParcels = () => {
        const { parcels } = this.state;
        return parcels.length ? parcels.map(d => {
            const { area, parcel, tractor, date } = d;
            const { name, culture } = parcel;
            return (
                <div className="col-lg-4 mb-4" key={d.id}>
                    <div className="card">
                        <div className="card-body">
                            {name && <h5 className="card-title mb-4">{name}</h5>}
                            {culture && <p className="card-subtitle mb-2 text-muted">Culture: {culture}</p>}
                            {area && <p className="card-subtitle mb-2 text-muted">Processed Area: {area}</p>}
                            {tractor.name && <p className="card-subtitle mb-2 text-muted">Tractor: {tractor.name}</p>}
                            {date && <p className="card-subtitle mb-2 text-muted">Date: {dateFormate(date)}</p>}
                        </div>
                    </div>
                </div>
            )
        }) : (
                <div className="empty-state">
                    <p>Data not found!</p>
                </div>
            )
    };

    render() {
        const { loading } = this.state;
        return (
            <Container className="report-wrapper">
                <h2 className="mb-5">Report Details</h2>

                <div className="row">
                    {this.generateParcels()}
                </div>
                <Loader show={loading} />
            </Container>
        );
    }
}

export default SingleReport;