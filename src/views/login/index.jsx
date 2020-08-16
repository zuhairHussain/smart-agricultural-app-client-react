import React, { Component } from 'react';
import Alert from '../../components/alerts';
import Loader from '../../components/loader';
import Container from '../../components/container';
import { Validator, ErrorMessages, isAllValid } from '../../helper/validator';
import { userService } from '../../helper/services';
import { history } from '../../history';
import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.validator = new Validator();
        this.state = {
            email: "",
            password: "",
            error: "",
            loading: false
        }
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            history.push('/dashboard');
        }
    }
    login() {
        const { email, password } = this.state
        let emailValid = this.validator.valid("email", email, true);
        let passValid = this.validator.valid("text", password, true);

        this.setState(emailValid.error ? { emailError: emailValid.message } : { emailError: '' })
        this.setState(passValid.error ? { passwordError: passValid.message } : { passwordError: '' })

        let isValid = isAllValid([emailValid.error, passValid.error]);

        if (isValid) {
            userService.login(email, password)
                .then(
                    user => {
                        if (!user.error) {
                            history.push('/dashboard');
                        } else {
                            // dispatch(loader(false));
                            // dispatch(failure(user.message.toString()));
                        }
                    },
                    error => {
                        // dispatch(loader(false));
                        // dispatch(failure(error.toString()));
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
        const { email, password, emailError, passwordError, error, loading } = this.state;
        return (
            <Container className="login-wrapper" withoutNav container="container" hideLogout>
                <Alert type="danger" show={error} text={error} />
                <h2 className="mb-4">Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            id="email"
                            value={email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <ErrorMessages error={emailError} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            id="pwd"
                            value={password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <ErrorMessages error={passwordError} />
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="btn btn-primary" onClick={() => this.login()}>Submit</button>
                    </div>
                </form>
                <Loader show={loading} />
            </Container>
        );
    }
}

export default Login;