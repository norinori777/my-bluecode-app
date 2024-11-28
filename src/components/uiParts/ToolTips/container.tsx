import React from "react";
import { FcQuestions } from "react-icons/fc";
import ToolTips from "./presenter";

interface ToolTipsContainerProps {
    text: string;
}

export const ToolTipsContainer = (props: ToolTipsContainerProps
) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => {
      setShow(!show)
    }

    return(
        <div className="relative" onClick={handleClick}>
            <div className="absolute top-1/2">
                <FcQuestions />
            </div>
            <ToolTips text={props.text} show={show} position="bottom" />
        </div>
    )
}