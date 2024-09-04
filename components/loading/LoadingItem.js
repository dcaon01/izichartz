import classes from "./LoadingItem.module.css";
import LoadingCircle from "./LoadingCircle.js";

export default function LoadingItem({ text }) {
    return (
        <div className={classes.LoadingItem}>
            <LoadingCircle />
            {text && <p>{text}</p>}
        </div>
    );
}