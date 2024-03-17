import classes from "./Rectangle.module.css";

export default function Rectangle({t, x, y}) {
    // Text inside of the Reactangle
    let text = t;
    //Position of the top-left angle
    let posX = x;
    let posY = y;

    return (
        <div className={classes.rectangle} style={{
            top: posY,
            left: posX
        }}>
            <p className={classes.text}>
                {text}
            </p>
        </div>
    );
}
