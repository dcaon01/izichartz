'use client';

import classes from './Workpane.module.css';
import Rectangle from '../graphics/Rectangle';

export default function Workpane({children, h, w}) {
    let height = h;
    let width = w;

    return (
        <div className={classes.view}>
            <div style={{height: height, width: width}}>
            </div>
        </div>
    );
}