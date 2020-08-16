import React, { Component } from "react";

class Validator extends Component {
    valid(type, value, required) {
        if (required && value == "" || value == undefined) {
            return { error: true, message: "This field is required" };
        } else if (type == "email") {
            let emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailre.test(String(value).toLowerCase())) {
                return { error: true, message: "Invalid email formate" };
            } else {
                return { error: false, message: "" };
            }
        } else {
            return { error: false, message: "" };
        }
    }
};

const ErrorMessages = (props) => (
    <p className={props.error ? 'error-message' : 'd-none'}> {props.error ? props.error : ""}</p>
);

const isAllValid = (array) => {
    if (Array.isArray(array)) {
        let check = (currentValue) => currentValue === false;
        return array.every(check);
    }
}

export {
    Validator,
    ErrorMessages,
    isAllValid
}