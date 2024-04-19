import { CSSProperties, ReactNode } from "react";

interface HiddenProps {
    children: ReactNode;
    visible: boolean;
}

const hiddenStyling = {
    display: "fixed",
    width: "0px",
    height: "0px"
} as CSSProperties;

const visibleStyling = {
    display: "block",
} as CSSProperties;

export default function Visibility({ children, visible }: HiddenProps) {

    const style = visible ? visibleStyling : hiddenStyling;

    return (
        <div style={style} className="visiblity">
            {children}
        </div>
    )

}