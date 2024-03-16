'use client';

import classes from './Workpane.module.css';
import { useRef } from 'react';

export default function Workpane(props) {
    let height = props.height;
    let width = props.width;

    return (
        <div className={classes.view}>
            <div style={{height: height, width: width}}>
            </div>
        </div>
    );
}