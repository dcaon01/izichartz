'use client';

import { useDispatch, useSelector } from 'react-redux';
import classes from './Workpane.module.css';
import { globalSlice } from '@/store/design/global-slice';

export default function Workpane(props) {
    const height = props.h;
    const width = props.w;
    const dispatch = useDispatch();

    function handleClicked() {
        dispatch(globalSlice.actions.selection(0));
    }

    return (
        <div
            className={classes.view}
            onClick={handleClicked}
        >
            <div style={{ height: height, width: width }}>
                {props.children}
            </div>
        </div>
    );
}