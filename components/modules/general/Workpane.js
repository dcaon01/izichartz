'use client';

import classes from './Workpane.module.css';
import Rectangle from '../graphics/Rectangle';

export default function Workpane(props) {
    let height = props.h;
    let width = props.w;

    return (
        <div className={classes.view}>
            <div style={{height: height, width: width}}>
                {props.children}
            </div>
        </div>
    );
}