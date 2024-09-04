import classes from "./FormButton.module.css";
import { useFormStatus } from "react-dom";

export default function FormButton({ text, pendingText }) {
    let { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className={`${classes.submitButton}`}
            type="submit"
        >
            {pending ? pendingText : text}
        </button>
    );
}

