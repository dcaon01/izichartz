import classes from "./UndoRedo.module.css";

export default function UndoRedo() {
    return (
        <div className={classes.undoredo}>
            <img src="/assets/global/undo.png" height={18} width={18} />
            <img src="/assets/global/forward.png" height={18} width={18} />
        </div>
    );
}

