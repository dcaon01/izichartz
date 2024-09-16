import classes from "./RenameProject.module.css";
import { useState } from "react";

export default function AuthInput({projectName}) {
    let [value, setValue] = useState(projectName);

    function changeName(event) {
        event.preventDefault()
        setValue(event.target.value);
    }

    return (
        <div className={classes.inputWrapper}>
            <label>Rename your Project</label>
            <input type="text" id="renaming-project-name" name="renaming-project-name" value={value} className={`${classes.input}`} onChange={changeName} />
        </div>
    );
}

