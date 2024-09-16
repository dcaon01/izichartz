import classes from "./FormButton.module.css";
import { useFormStatus } from "react-dom";

export default function FormButton({ text, pendingText, onClick }) {
    let { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className={`${classes.submitButton}`}
            type="submit"
            onClick={onClick}
        >
            {pending ? pendingText : text}
        </button>
    );
}

