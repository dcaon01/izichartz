import classes from "./LoadingItem.module.css";
import LoadingCircle from "./LoadingCircle.js";

export default function LoadingItem({ text, circleSize }) {
    return (
        <div className={classes.LoadingItem}>
            <LoadingCircle size={circleSize}/>
            {text && <p>{text}</p>}
        </div>
    );
}