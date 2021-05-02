import React, { createContext, useEffect, useReducer, useRef } from 'react';
import { IActionType, IState, reducer, state, NavigDirection, setItems, setPointerChanges, navigateToRight, navigateToLeft, setTouchChanges } from '../context';
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
    let dirX: NavigDirection = null;
    let movementX: number = null;
    let objectPosX: number = null;
    const isMobile: boolean = navigator.userAgent.indexOf("Mobi") > -1;
    const initialCSS:React.CSSProperties = {
        position: "relative",
        objectFit: "none",
        objectPosition: "0px",
    };

    const setCssAnimation = () => {
        itemRef.current.style.objectPosition = "0px";
        itemRef.current.style.transition = "all 400ms ease-out";
    }

    useEffect(() => {
        if (!wrapper) dispatch(setItems(React.Children.toArray(children!), infinite));

        return () => {
            // clean up            
        }
    }, [children]);

    const onPointerDownHandler = (t: React.PointerEvent<any>) => {
        // set default css, set pointer changes to the store
        itemRef.current.style.transition = "none";
        dispatch(setPointerChanges({ pointerDown: true, pointerDownPosX: t.clientX }));
    }

    const onPointerUpHandler = (t: React.PointerEvent<any>) => {
        // detect move direction
        if (mainState.pointerValues.pointerDownPosX < t.clientX) dirX = NavigDirection.Right;
        else if (mainState.pointerValues.pointerDownPosX > t.clientX) dirX = NavigDirection.Right;

        // set pointer changes to the store
        dispatch(setPointerChanges({ pointerDown: false }));

        // get pointer position
        objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        // success - next - pointer up
        if (dirX === NavigDirection.Right && objectPosX > itemRef.current.width) dispatch(navigateToRight());
        // success - prev - pointer up
        else if (dirX === NavigDirection.Left && objectPosX < -itemRef.current.width) dispatch(navigateToLeft());

        setCssAnimation();
    }

    const onPointerOutHandler = (t: React.PointerEvent<any>) => {
        // detect move direction
        if (mainState.pointerValues.pointerDownPosX < t.clientX) dirX = NavigDirection.Right;
        else if (mainState.pointerValues.pointerDownPosX > t.clientX) dirX = NavigDirection.Left;

        // set pointer changes to the store
        dispatch(setPointerChanges({ pointerDown: false }));

        // get pointer position
        objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        // success - next - pointer up
        if (dirX === NavigDirection.Right && objectPosX > itemRef.current.width)
            dispatch(navigateToRight());
        // success - prev - pointer up
        else if (dirX === NavigDirection.Left && objectPosX < -itemRef.current.width)
            dispatch(navigateToLeft());

        setCssAnimation();
    }

    const onPointerMoveHandler = (t: React.PointerEvent<any>) => {
        // get pointer position
        objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        // set new values to css object-position
        if (mainState.pointerValues && mainState.pointerValues.pointerDown)
            itemRef.current.style.objectPosition = `${objectPosX + 2 * t.movementX}px`;
    }

    const onTouchStartHandler = (t: React.TouchEvent<any>) => {
        // set default css, set touch changes to the store
        itemRef.current.style.transition = "none";
        dispatch(setTouchChanges({ touchDown: true, touchDownPosX: t.touches[0].clientX }));
    }

    const onTouchEndHandler = (t: React.TouchEvent<any>) => {   
        // detect move direction
        if (t.changedTouches[0].clientX - mainState.touchValues.touchDownPosX < 0) dirX = NavigDirection.Left;
        else if (t.changedTouches[0].clientX - mainState.touchValues.touchDownPosX > 0) dirX = NavigDirection.Right;

        // set touch changes to the store
        dispatch(setTouchChanges({ touchDown: false }));

        // get touch position
        objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        // success - next - mouse up
        if (dirX === NavigDirection.Right && objectPosX > itemRef.current.width)
            dispatch(navigateToRight());
        // success - prev - mouse up
        else if (dirX === NavigDirection.Left && objectPosX < -itemRef.current.width)
            dispatch(navigateToLeft());

        setCssAnimation();
    }

    const onTouchMoveHandler = (t: React.TouchEvent<any>) => {
        // get touch position
        objectPosX = parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

        // get touch move value
        movementX = t.touches[0].clientX - mainState.touchValues.touchDownPosX;
        
        // set new values to css- object-position
        if (mainState.touchValues && mainState.touchValues.touchDown)
            itemRef.current.style.objectPosition = `${objectPosX + movementX / 5}px`;
    }

    return (
        <AppCtx.Provider value={{ state: mainState, dispatch }}>
            <NavigButton direction={NavigDirection.Left} />
            <AnimatedItem
                style={initialCSS}
                ref={itemRef}
                draggable={false}
                onPointerDown={(t) => !isMobile ? onPointerDownHandler(t) : null}
                onPointerUp={(t) => !isMobile ? onPointerUpHandler(t) : null}
                onPointerOut={(t) => !isMobile ? onPointerOutHandler(t) : null}
                onPointerMove={(t) => !isMobile ? onPointerMoveHandler(t) : null}
                onTouchStart={(t) => isMobile ? onTouchStartHandler(t) : null}
                onTouchEnd={(t) => isMobile ? onTouchEndHandler(t) : null}
                onTouchMove={(t) => isMobile ? onTouchMoveHandler(t) : null}
                rotation={mainState.itemDirection}
                src={mainState.itemToShow ? mainState.itemToShow.imgSrc : null}
                alt="img" />
            <NavigButton direction={NavigDirection.Right} />
        </AppCtx.Provider>
    )
}

export default Carousel;