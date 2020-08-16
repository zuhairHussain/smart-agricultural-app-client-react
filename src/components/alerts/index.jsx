import React from 'react';

export default function Alert(props) {
    const { type, show, text, className } = props;
    return (
        <div className={`alert fade  ${type ? ' alert-' + type : ''} ${show ? ' show d-block ' : ' d-none '} ${className ? className : ''}`}>
            {text ? text : ""}
        </div>
    );
}