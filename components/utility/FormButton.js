import classes from "./FormButton.module.css";
import { robotoMono } from "@/app/fonts";
import { useFormStatus } from "react-dom";

export default function FormButton({ text, pendingText }) {
    let { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className={`${classes.submitButton} ${robotoMono.className}`}
            type="submit"
        >
            {pending ? pendingText : text}
        </button>
    );
}

