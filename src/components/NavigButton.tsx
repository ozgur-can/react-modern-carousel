import React, {useContext} from "react";
import { navigateToLeft, navigateToRight, NavigDirection } from "../context";
import { AppCtx } from "./Carousel";

export interface NavigButtonProps {
    direction: NavigDirection;
}

const NavigButton: React.FC<NavigButtonProps> = ({ direction }) => {
    const context = useContext(AppCtx);
    
    if(direction === NavigDirection.Left)
    return <button onClick={() => context.dispatch(navigateToLeft())}>LEFT</button>
    
    if(direction === NavigDirection.Right)
    return <button onClick={() => context.dispatch(navigateToRight())}>RIGHT</button>
}

export default NavigButton;