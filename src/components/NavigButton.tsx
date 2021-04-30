import React, { useContext } from "react";
import { moveWithAnimation, navigateToLeft, navigateToRight, NavigDirection } from "../context";
import { AppCtx } from "./Carousel";

export interface NavigButtonProps {
    direction: NavigDirection;
}

const NavigButton: React.FC<NavigButtonProps> = ({ direction }) => {
    const context = useContext(AppCtx);

    if (direction === NavigDirection.Left)
        return <button
            onClick={() => context.dispatch(navigateToLeft())}
            onMouseDown={() => context.dispatch(moveWithAnimation("<"))}
            onMouseUp={() => context.dispatch(moveWithAnimation(">"))}>LEFT</button>

    if (direction === NavigDirection.Right)
        return <button
            onClick={() => context.dispatch(navigateToRight())}
            onMouseDown={() => context.dispatch(moveWithAnimation("<"))}
            onMouseUp={() => context.dispatch(moveWithAnimation(">"))}>RIGHT</button>
}

export default NavigButton;