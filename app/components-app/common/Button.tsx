import { useState } from "react";
import "./Button.css";

type TAsyncButtonProps = {
    title: string;
    className?: string;
    fn?: Function;
    disabled?: boolean;
}

export const AsyncButton = ({title, fn, className, disabled}: TAsyncButtonProps = {
    title: "Unnamed",
    disabled: false
}) => {
    const [awaiting, setAwait] = useState(false);
    return (
        <button className={className ?? "btn"} disabled={awaiting || disabled} onClick={async () => {
            setAwait(true)
            await fn()
            setAwait(false)
        }}>{title}</button>
    );
}