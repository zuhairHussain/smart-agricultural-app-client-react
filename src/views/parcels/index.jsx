import React, { Component } from 'react';
import Alert from '../../components/alerts';
import Table from '../../components/table';
import { userService } from '../../helper/services';
import Container from '../../components/container';
import Loader from '../../components/loader';
import { Validator, ErrorMessages, isAllValid } from '../../helper/validator';
import './parcels.scss';

class Parcels extends Component {
    constructor(props) {
        super(props);
        this.validator = new Validator();
        this.state = {
            data: [],
            columns: [
                {
                    name: "name",
                    label: "Name",
                    options: {
                        filter: true,
                        sort: true,
                    }
                },
                {
                    name: "culture",
                    label: "Culture",
                    options: {
                        filter: true,
                        sort: false,
                    }
                },
                {
                    name: "area",
                    label: "Area",
                    options: {
                        filter: true,
                        sort: false,
                    }
                }
            ],
            options: {
                filterType: "dropdown",
                responsive: "scroll",
                selectableRows: false,
                selectableRowsHeader: false
            },
            loading: false,
            pName: "",
            culture: "",
            area: ""
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        userService.getParcels().then(
            data => {
                if (!data.error) {
                    this.setState({ loading: false });
                    this.setState({ data: data.parcel })
                } else {
                    this.setState({ loading: false });
                    this.setState({ dataError: data.message })
                }
            },
            error => {
                this.setState({ loading: false });
                this.setState({ dataError: error.message })
            }
        );
    }

    submitForm = () => {
        const { pName, culture, area, data } = this.state;

        let pNameValid = this.validator.valid("text", pName, true);
        let cultureValid = this.validator.valid("text", culture, true);
        let areaValid = this.validator.valid("text", area, true);

        this.setState(pNameValid.error ? { pNameError: pNameValid.message } : { pNameError: '' })
        this.setState(cultureValid.error ? { cultureError: cultureValid.message } : { cultureError: '' })
        this.setState(areaValid.error ? { areaError: areaValid.message } : { areaError: '' })

        let isValid = isAllValid([pNameValid.error, cultureValid.error, areaValid.error]);

        if (isValid) {
            this.setState({ loading: true });
            userService.addParcel({ name: pName, culture, area }).then(
                res => {
                    if (!res.error) {
                        this.setState({ loading: false, data: [res.parcel, ...data] });
                        alert("Parcel added successfully!")
                    } else {
                        this.setState({ loading: false });
                        this.setState({ formSubmitError: res.message })
                    }
                },
                error => {
                    this.setState({ loading: false });
                    this.setState({ formSubmitError: error.message })
                }
            );
        }
    }

    errorMessages(error) {
        return (
            <p className={error ? 'error' : 'd-none'}> {error ? error : ""}</p>
        );
    }

    render() {
        const { loading, pName, pNameError, culture, cultureError, area, areaError, formSubmitError, columns, options, data, dataError } = this.state;
        return (
            <Container>
                <h2>Parcels</h2>
                <div className="row">
                    <div className="col-lg-8 order-2 order-sm-1">
                        <Alert type="danger" show={formSubmitError} text={formSubmitError} />
                        <div className="card mt-5">
                            <div className="card-body p-0">
                                <Table
                                    title="Parcels"
                                    tableData={data}
                                    columns={columns}
                                    options={options}
                                    dataError={dataError}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 order-1 order-sm-2">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h5 className="mb-3">Add Parcels</h5>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Name"
                                            required
                                            value={pName}
                                            onChange={(e) => this.setState({ pName: e.target.value })}
                                        />
                                        <ErrorMessages error={pNameError} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="culture">Culture</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="culture"
                                            placeholder="Enter Culture"
                                            required
                                            value={culture}
                                            onChange={(e) => this.setState({ culture: e.target.value })}
                                        />
                                        <ErrorMessages error={cultureError} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="area">Area</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="area"
                                            placeholder="Enter Area"
                                            value={area}
                                            required
                                            onChange={(e) => this.setState({ area: e.target.value })}
                                        />
                                        <ErrorMessages error={areaError} />
                                    </div>
                                    <button type="button" onClick={() => this.submitForm()} className="btn btn-primary btn-lg btn-block">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Loader show={loading} />
            </Container>
        );
    }
}

export default Parcels;