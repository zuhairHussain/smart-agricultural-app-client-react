import { authHeader } from './common';

const apiUrl = "http://localhost:3000/api/v1/";

export const userService = {
    login,
    logout,
    register,
    addProcessParcel,
    getProcessParcels,
    getProcessedParcelsArea,
    getProcessParcelsById,
    addParcel,
    getParcels,
    addTractor,
    getTractors,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl}login`, requestOptions)
        .then(handleLoginResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function register(name, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    };

    return fetch(`${apiUrl}register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function addProcessParcel(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;' },
        headers: authHeader(),
        body: formData(data)
    };

    return fetch(`${apiUrl}process-parcel/create`, requestOptions)
        .then(handleLoginResponse)
        .then(res => {
            return res;
        });
}

function getProcessParcels() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}process-parcels`, requestOptions).then(handleResponse);
}

function getProcessParcelsById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}process-parcels-by-id/${id}`, requestOptions).then(handleResponse);
}


function addParcel(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        headers: authHeader(),
        body: formData(data)
    };

    return fetch(`${apiUrl}parcel/create`, requestOptions)
        .then(handleLoginResponse)
        .then(res => {
            return res;
        });
}

function getParcels() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}parcels`, requestOptions).then(handleResponse);
}

function getProcessedParcelsArea() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}process-parcels-area`, requestOptions).then(handleResponse);
}

function addTractor(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;' },
        headers: authHeader(),
        body: formData(data)
    };

    return fetch(`${apiUrl}tractor/create`, requestOptions)
        .then(handleLoginResponse)
        .then(res => {
            return res;
        });
}

function getTractors() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}tractors`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function handleLoginResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function formData(array) {
    var data = new URLSearchParams();
    for (var k in array) {
        data.append(k, array[k]);
    }

    // var data = new FormData();

    // for (var k in array) {
    //     data.append(k, array[k]);
    // }

    return data;
}