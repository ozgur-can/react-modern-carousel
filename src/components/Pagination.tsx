import React, { useContext, useEffect, useRef } from "react";
import { getItemAt } from "../context";
import { paginationCSS, setCssAnimationEnd } from "../helper";
import { AppCtx } from "./Carousel";
import { PaginationButton } from "./styled-components/PaginationButton";

export interface PaginationProps { }

const Pagination: React.FC<PaginationProps> = () => {
    const { state, dispatch } = useContext(AppCtx);
    const itemRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (itemRef) itemRef.current.style.animation = "PaginationButtonAnimation 0.8s linear";
    }, [itemRef]);

    return (
        <div style={paginationCSS} ref={itemRef} onAnimationEnd={() => setCssAnimationEnd(itemRef)}>
            {
                state.items ? state.items.map((item, i) => {
                    if (i + 1 === state.itemIndex)
                        return <PaginationButton bgColor="#7c9473" onClick={() => dispatch(getItemAt(i))} key={i}></PaginationButton>
                    else
                        return <PaginationButton bgColor="#cfdac8" onClick={() => dispatch(getItemAt(i))} key={i}></PaginationButton>
                }) : null
            }
        </div>
    );
}

export default React.memo(Pagination);