import React, { Component } from 'react';
import { userService } from '../../services/services';
import './dashboard.scss';
import Container from '../../components/container';
import Alert from '../../components/alerts';
import Loader from '../../components/loader';
import { NavLink } from 'react-router-dom';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            processed_parcels: [],
            parcels: []
        }
    }
    componentDidMount() {
        this.setState({ loading: true });
        userService.getProcessedParcelsArea().then(
            data => {
                if (!data.error) {
                    this.getParcels()
                    this.setState({ processedArea: data.parcel })
                } else {
                    this.setState({ loading: false, dataError: data.message });
                }
            },
            error => {
                this.setState({ loading: false, dataError: error.message });
            }
        );
    }
    getParcels() {
        this.setState({ loading: true });
        userService.getParcels().then(
            data => {
                if (!data.error) {
                    let merged = [];
                    const { processedArea } = this.state;
                    for (let i = 0; i < data.parcel.length; i++) {
                        merged.push({
                            ...processedArea[i],
                            ...(data.parcel.find((itmInner) => itmInner._id === data.parcel[i]._id))
                        }
                        );
                    }
                    this.setState({ parcels: merged, loading: false })
                } else {
                    this.setState({ loading: false, dataError: data.message });
                }
            },
            error => {
                this.setState({ loading: false, dataError: error.message });
            }
        );
    }
    generateParcels = () => {
        const { parcels } = this.state;
        return parcels.length ? parcels.map(d => {
            const { totalAreasProcessed, area, name, culture, _id } = d;

            let processedAreaPercent = area - totalAreasProcessed;
            processedAreaPercent = (processedAreaPercent / area) * 100;
            processedAreaPercent = 100 - processedAreaPercent;

            return (
                <div className="col-lg-4 mb-4" key={d.id}>
                    <div className="card">
                        <div className="card-body">
                            {name && <h5 className="card-title mb-4">{name}</h5>}
                            {culture && <p className="card-subtitle mb-2 text-muted">Culture: {culture}</p>}
                            {area && <p className="card-subtitle mb-2 text-muted">Total Area: {area}</p>}
                            <p className="card-subtitle text-muted">Processed Area: {totalAreasProcessed ? totalAreasProcessed : "0"}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item pt-4 pb-4">
                                <p className="card-subtitle mb-2 text-muted">Processed Area Progress</p>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${processedAreaPercent ? processedAreaPercent : "0"}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </li>
                            <li className={`${!totalAreasProcessed ? "disable" : ""} list-group-item`}>
                                <NavLink exact to={`/report/${_id}`} className="card-link" activeClassName="active">View Report</NavLink>
                            </li>
                        </ul>
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
                <h2 className="mb-5">Report</h2>

                <div className="row">
                    {this.generateParcels()}
                </div>
                <Loader show={loading} />
            </Container>
        );
    }
}

export default Dashboard;