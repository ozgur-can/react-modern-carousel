import React, { useContext } from "react";
import { getItemAt } from "../context";
import { AppCtx } from "./Carousel";

export interface BottomNavBarProps {

}

const BottomNavBar: React.FC<BottomNavBarProps> = () => {
    const { state, dispatch } = useContext(AppCtx);
    return (
        <>
            {
                state.items ? (state.items.map((item, i) => <button style={{ borderRadius: "30px", border: "none", background: "lightblue", padding: "0.25rem", margin: "0.25rem" }} onClick={() => dispatch(getItemAt(i))} key={i}>{i}</button>)) : (null)
            }
        </>
    );
}

export default BottomNavBar;