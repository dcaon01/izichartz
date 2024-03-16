'use client';

import classes from './Workpane.module.css';
import { useRef } from 'react';

export default function Workpane(props) {
    let height = props.height;
    let width = props.width;
    let view = useRef();

    view.current

    return (
        <div className={classes.view} ref={view}>
            <div style={{height: height, width: width}}>
            </div>
        </div>
    );
}