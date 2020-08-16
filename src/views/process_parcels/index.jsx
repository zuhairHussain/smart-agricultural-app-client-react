import React, { Component } from 'react';
import Alert from '../../components/alerts';
import Table from '../../components/table';
import { userService } from '../../helper/services';
import Container from '../../components/container';
import Loader from '../../components/loader';
import { Validator, ErrorMessages, isAllValid } from '../../helper/validator';
import './process_parcels.scss';

class ProcessParcels extends Component {
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
                    name: "date",
                    label: "Date",
                    options: {
                        filter: true,
                        sort: false,
                    }
                },
                {
                    name: "tractor",
                    label: "Tractor",
                    options: {
                        filter: true,
                        sort: false,
                    }
                },
                {
                    name: "area",
                    label: "Processed Area",
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
            selectedArea: "",
            selectedParcel: "",
            selectedTractor: ""
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        userService.getProcessParcels().then(
            data => {
                if (!data.error) {
                    this.getParcels()
                    this.setState({ data: data.parcel })
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
                    this.getTractors()
                    this.setState({ parcels: data.parcel })
                } else {
                    this.setState({ loading: false, parcelsError: data.message });
                }
            },
            error => {
                this.setState({ loading: false, parcelsError: error.message });
            }
        );
    }

    getTractors() {
        this.setState({ loading: true });
        userService.getTractors().then(
            data => {
                if (!data.error) {
                    this.setState({ loading: false, tractors: data.tractor });
                } else {
                    this.setState({ loading: false, tractorsError: data.message });
                }
            },
            error => {
                this.setState({ loading: false, tractorsError: error.message });
            }
        );
    }

    submitForm = () => {
        const { selectedTractor, selectedParcel, selectedArea, data } = this.state;

        let selectedTractorValid = this.validator.valid("text", selectedTractor, true);
        let selectedParcelValid = this.validator.valid("text", selectedParcel, true);
        let selectedAreaValid = this.validator.valid("text", selectedArea, true);

        this.setState(selectedTractorValid.error ? { selectedTractorError: selectedTractorValid.message } : { selectedTractorError: '' })
        this.setState(selectedParcelValid.error ? { selectedParcelError: selectedParcelValid.message } : { selectedParcelError: '' })
        this.setState(selectedAreaValid.error ? { selectedAreaError: selectedAreaValid.message } : { selectedAreaError: '' })

        let isValid = isAllValid([selectedTractorValid.error, selectedParcelValid.error, selectedAreaValid.error]);

        if (isValid) {
            this.setState({ loading: true });
            userService.addProcessParcel({ tractor: selectedTractor, parcel: selectedParcel, area: selectedArea }).then(
                res => {
                    if (!res.error) {
                        this.setState({ loading: false, data: [res.parcel, ...data] });
                        alert("Parcel processed successfully!");
                        window.location.reload();
                    } else {
                        this.setState({ loading: false, formSubmitError: res.message });

                    }
                },
                error => {
                    this.setState({ loading: false, formSubmitError: error });
                }
            );
        }

    }

    errorMessages(error) {
        return (
            <p className={error ? 'error' : 'd-none'}> {error ? error : ""}</p>
        );
    }

    formateDate(date) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today = new Date(date);
        return today.toLocaleDateString("en-US", options);
    }

    render() {
        const { loading, selectedTractorError, selectedParcelError, selectedAreaError, formSubmitError, columns, options, data,
            dataError, parcelsError, tractorsError, tractors, parcels, selectedArea
        } = this.state;

        const processedParcels = data.map(d => {
            let parcel = {};
            parcel["name"] = d.parcel.name;
            parcel["culture"] = d.parcel.culture;
            parcel["date"] = this.formateDate(d.date);
            parcel["tractor"] = d.tractor.name;
            parcel["area"] = d.area;
            parcel["total_area"] = d.parcel.area;
            return parcel;
        })
        return (
            <Container>
                <h2>Process Parcel</h2>
                <div className="row">
                    <div className="col-lg-8 order-2 order-sm-1">
                        <Alert type="danger" show={formSubmitError} text={formSubmitError} />
                        <Alert type="danger" show={tractorsError} text={tractorsError} />
                        <Alert type="danger" show={parcelsError} text={parcelsError} />
                        <div className="card mt-5">
                            <div className="card-body p-0">
                                <Table
                                    title="Processed Parcels"
                                    tableData={processedParcels}
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
                                <h5 className="mb-3">Process Parcel</h5>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="tractor">Tractor</label>
                                        {
                                            tractors ? (
                                                <select className="form-control" onChange={(e) => this.setState({ selectedTractor: e.target.value })}>
                                                    <option defaultValue value="">Select Tractor</option>
                                                    {
                                                        tractors.map(d => <option key={d._id} value={d._id}>{d.name}</option>)
                                                    }
                                                </select>
                                            ) : ""
                                        }
                                        <ErrorMessages error={selectedTractorError} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tractor">Parcel</label>
                                        {parcels ? (
                                            <select className="form-control" onChange={(e) => this.setState({ selectedParcel: e.target.value })}>
                                                <option defaultValue value="">Select Parcels</option>
                                                {
                                                    parcels.map(d => <option key={d._id} value={d._id}>{d.name}</option>)
                                                }
                                            </select>
                                        ) : ""
                                        }
                                        <ErrorMessages error={selectedParcelError} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="area">Area</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="area"
                                            placeholder="Enter Area"
                                            value={selectedArea}
                                            onChange={(e) => this.setState({ selectedArea: e.target.value })}
                                        />
                                        <ErrorMessages error={selectedAreaError} />
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

export default ProcessParcels;