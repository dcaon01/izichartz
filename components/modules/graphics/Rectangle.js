
export default function Rectangle(props) {
    // Dimensions
    height = props.height;
    width = props.width;
    // Text inside of the Reactangle
    text = props.text;
    // Color
    bgColor = props.bgColor;
    //Position of the top-left angle
    x = props.positionX;
    y = props.positiony;

    return (
        <div style={{
            top: y,
            left: x,
            backgroundColor: bgColor,
            height: height,
            width: width,
            border: 2,
            borderColor: "black"
        }}>
            <p>
                {text}
            </p>
        </div>
    );
}
