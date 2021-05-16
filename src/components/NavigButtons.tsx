import React, { useContext } from "react";
import { navigateToLeft, navigateToRight } from "../context";
import { NavigButtonsCSS } from "../helper";
import { AppCtx } from "./Carousel";
import { NavigButton } from "./styled-components/NavigButton";

const NavigButtons: React.FC = () => {
    const context = useContext(AppCtx);

    return (
        <div style={NavigButtonsCSS}>
            <NavigButton onClick={() => context.dispatch(navigateToLeft())}>&#9664;</NavigButton>
            <NavigButton onClick={() => context.dispatch(navigateToRight())}>&#9654;</NavigButton>
        </div>
    )
}

export default NavigButtons;