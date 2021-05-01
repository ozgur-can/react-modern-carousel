import React, { createContext, useEffect, useReducer, useRef } from 'react';
import { IActionType, IState, reducer, state, NavigDirection, setItems, setPointerChanges, navigateToRight, navigateToLeft } from '../context';
import NavigButton from './NavigButton';
import { AnimatedItem } from './styled-components';
export interface CarouselProps {
    infinite: boolean;
    wrapper: boolean;
}

export const AppCtx = createContext<{ state: IState, dispatch: React.Dispatch<IActionType> }>({ state: state, dispatch: null });

const Carousel: React.FC<CarouselProps> = ({ wrapper, infinite, children }) => {
    const [mainState, dispatch] = useReducer(reducer, state);
    const itemRef = useRef<HTMLImageElement>(null);
    let movX: string = null;
    let objectPosX: number = null;

    useEffect(() => {
        if (!wrapper) dispatch(setItems(React.Children.toArray(children!), infinite));
        return () => {
            // clean up            
        }
    }, [children]);

    const onPointerDownHandler = (t: React.PointerEvent<any>) => {
        itemRef.current.style.transition = "none";
        dispatch(setPointerChanges({ pointDown: true, pointDownPosX: t.clientX }));
    }

    const onPointerUpHandler = (t: React.PointerEvent<any>) => {
        if (mainState.pointerValues.pointDownPosX < t.clientX) movX = "R";
        else if (mainState.pointerValues.pointDownPosX > t.clientX) movX = "L";

        dispatch(setPointerChanges({ pointDown: false }));

        objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        // success - next - pointer up
        if (movX === "R" && objectPosX > itemRef.current.width)
            dispatch(navigateToRight());
        // success - prev - pointer up
        else if (movX === "L" && objectPosX < -itemRef.current.width)
            dispatch(navigateToLeft());

        itemRef.current.style.objectPosition = "0px";
        itemRef.current.style.transition = "all 400ms ease-out";
    }

    const onPointerOutHandler = (t: React.PointerEvent<any>) => {
        if (mainState.pointerValues.pointDownPosX < t.clientX) movX = "R";
        else if (mainState.pointerValues.pointDownPosX > t.clientX) movX = "L";

        dispatch(setPointerChanges({ pointDown: false }));

        objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        // success - next - pointer up
        if (movX === "R" && objectPosX > itemRef.current.width) 
            dispatch(navigateToRight());
        // success - prev - pointer up
        else if (movX === "L" && objectPosX < -itemRef.current.width)
            dispatch(navigateToLeft());

        itemRef.current.style.objectPosition = "0px";
        itemRef.current.style.transition = "all 400ms ease-out";
    }

    const onPointerMoveHandler = (t: React.PointerEvent<any>) => {
        let objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        if (mainState.pointerValues && mainState.pointerValues.pointDown && t.movementX < 0)
            itemRef.current.style.objectPosition = `${objectPosX - 10}px`;

        if (mainState.pointerValues && mainState.pointerValues.pointDown && t.movementX > 0)
            itemRef.current.style.objectPosition = `${objectPosX + 10}px`;
    }

    return (
        <AppCtx.Provider value={{ state: mainState, dispatch }}>
            <NavigButton direction={NavigDirection.Left} />
            <AnimatedItem
                style={{
                    position: "relative",
                    objectFit: "none",
                    objectPosition: "0px",
                }}
                ref={itemRef}
                draggable={false}
                onPointerDown={onPointerDownHandler}
                onPointerUp={onPointerUpHandler}
                onPointerOut={onPointerOutHandler}
                onPointerMove={onPointerMoveHandler}
                rotation={mainState.itemDirection}
                src={mainState.itemToShow ? mainState.itemToShow.imgSrc : null}
                alt="img" />
            <NavigButton direction={NavigDirection.Right} />
        </AppCtx.Provider>
    )
}

export default Carousel;