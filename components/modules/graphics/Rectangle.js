
export default function Rectangle({h, w, t, bgCol, posX, posY}) {
    // Dimensions
    let height = h;
    let width = w;
    // Text inside of the Reactangle
    let text = t;
    // Color
    let bgColor = bgCol;
    //Position of the top-left angle
    let x = posX;
    let y = posY;

    return (
        <div style={{
            position: "absolute",
            top: y,
            left: x,
            backgroundColor: bgColor,
            minHeight: 40,
            minWidth: 100,
            height: height,
            width: width,
            border: "1px solid black",
            padding: 10
        }}>
            <p>
                {text}
            </p>
        </div>
    );
}
