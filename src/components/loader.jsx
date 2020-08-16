import React from 'react';

export default function Loader(props) {
    return (
        <div className={props.show ? 'show loader-wrap' : 'loader-wrap'}>
            <div className="lod-cnt">
                <div className="loader"></div>
                <span className="hed">Please Wait</span>
            </div>
        </div>
    );
}