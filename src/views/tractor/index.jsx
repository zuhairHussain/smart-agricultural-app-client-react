import React, { Component } from 'react';
import Alert from '../../components/alerts';
import Table from '../../components/table';
import { userService } from '../../helper/services';
import Container from '../../components/container';
import Loader from '../../components/loader';
import { Validator, ErrorMessages, isAllValid } from '../../helper/validator';
import './tractor.scss';

class Tractor extends Component {
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
                }
            ],
            options: {
                filterType: "dropdown",
                responsive: "scroll",
                selectableRows: false,
                selectableRowsHeader: false
            },
            loading: false,
            tName: ""
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        userService.getTractors().then(
            data => {
                if (!data.error) {
                    this.setState({ loading: false });
                    this.setState({ data: data.tractor })
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
        const { tName, data } = this.state;

        let tNameValid = this.validator.valid("text", tName, true);

        this.setState(tNameValid.error ? { tNameError: tNameValid.message } : { tNameError: '' })

        let isValid = isAllValid([tNameValid.error]);

        if (isValid) {
            this.setState({ loading: true });
            userService.addTractor({ name: tName }).then(
                res => {
                    if (!res.error) {
                        this.setState({ loading: false, data: [res.tractor, ...data] });
                        alert("Tractor added successfully!")
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
        const { loading, tName, tNameError, formSubmitError, columns, options, data, dataError } = this.state;
        return (
            <Container>
                <h2>Tractor</h2>
                <div className="row">
                    <div className="col-lg-8 order-2 order-sm-1">
                        <Alert type="danger" show={formSubmitError} text={formSubmitError} />
                        <div className="card mt-5">
                            <div className="card-body p-0">
                                <Table
                                    title="Tractors"
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
                                <h5 className="mb-3">Add Tractor</h5>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Name"
                                            required
                                            value={tName}
                                            onChange={(e) => this.setState({ tName: e.target.value })}
                                        />
                                        <ErrorMessages error={tNameError} />
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

export default Tractor;