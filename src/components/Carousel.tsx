import React, { createContext, useEffect, useReducer, useRef } from 'react';
import { IActionType, IState, reducer, state, NavigDirection, setItems, setPointerChanges, navigateToRight, navigateToLeft, setTouchChanges } from '../context';
import NavigButton from './NavigButton';
import { AnimatedItem } from './AnimatedItem';
export interface CarouselProps {
    infinite: boolean;
}

type ElementType = HTMLImageElement | HTMLCanvasElement;
type PointerEvent = React.PointerEvent<ElementType>;
type TouchEvent = React.TouchEvent<ElementType>;

export const AppCtx = createContext<{ state: IState, dispatch: React.Dispatch<IActionType> }>({ state: state, dispatch: null });

const Carousel: React.FC<CarouselProps> = ({ infinite, children }) => {
    const [mainState, dispatch] = useReducer(reducer, state);
    const itemRef = useRef<ElementType>(null);
    let directionX: NavigDirection = null;
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

    const getObjectPosX = (): number => {
        return parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);
    }

    useEffect(() => {
        dispatch(setItems(React.Children.toArray(children!), infinite));

        return () => {
            // clean up            
        }
    }, [children]);

    const onPointerDownHandler = (t: PointerEvent) => {
        // set default css, set pointer changes to the store
        itemRef.current.style.transition = "none";
        dispatch(setPointerChanges({ pointerDown: true, pointerDownPosX: t.clientX }));
    }

    const onPointerUpHandler = (t: PointerEvent) => {
        // detect move direction
        if (mainState.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
        else if (mainState.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Right;

        // set pointer changes to the store
        dispatch(setPointerChanges({ pointerDown: false }));

        // get pointer position
        objectPosX = getObjectPosX();

        // success - next - pointer up
        if (directionX === NavigDirection.Right && objectPosX > itemRef.current.width) dispatch(navigateToRight());
        // success - prev - pointer up
        else if (directionX === NavigDirection.Left && objectPosX < -itemRef.current.width) dispatch(navigateToLeft());

        setCssAnimation();
    }

    const onPointerOutHandler = (t: PointerEvent) => {
        // detect move direction
        if (mainState.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
        else if (mainState.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Left;

        // set pointer changes to the store
        dispatch(setPointerChanges({ pointerDown: false }));

        // get pointer position
        objectPosX = getObjectPosX();

        // success - next - pointer up
        if (directionX === NavigDirection.Right && objectPosX > itemRef.current.width)
            dispatch(navigateToRight());
        // success - prev - pointer up
        else if (directionX === NavigDirection.Left && objectPosX < -itemRef.current.width)
            dispatch(navigateToLeft());

        setCssAnimation();
    }

    const onPointerMoveHandler = (t: PointerEvent) => {
        // get pointer position
        objectPosX = getObjectPosX();

        // set new values to css object-position
        if (mainState.pointerValues && mainState.pointerValues.pointerDown) {
            itemRef.current.style.objectPosition = `${objectPosX + 2 * t.movementX}px`;
        }
    }

    const onTouchStartHandler = (t: TouchEvent) => {
        // set default css, set touch changes to the store
        itemRef.current.style.transition = "none";
        dispatch(setTouchChanges({ touchDown: true, touchDownPosX: t.touches[0].clientX }));
    }

    const onTouchEndHandler = (t: TouchEvent) => {
        // detect move direction
        if (t.changedTouches[0].clientX - mainState.touchValues.touchDownPosX < 0) directionX = NavigDirection.Left;
        else if (t.changedTouches[0].clientX - mainState.touchValues.touchDownPosX > 0) directionX = NavigDirection.Right;

        // set touch changes to the store
        dispatch(setTouchChanges({ touchDown: false }));

        // get touch position
        objectPosX = getObjectPosX();

        // success - next - mouse up
        if (directionX === NavigDirection.Right && objectPosX > itemRef.current.width)
            dispatch(navigateToRight());
        // success - prev - mouse up
        else if (directionX === NavigDirection.Left && objectPosX < -itemRef.current.width)
            dispatch(navigateToLeft());

        setCssAnimation();
    }

    const onTouchMoveHandler = (t: TouchEvent) => {
        // get touch position
        objectPosX = getObjectPosX();

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
                onPointerDown={(t: PointerEvent) => !isMobile ? onPointerDownHandler(t) : null}
                onPointerUp={(t: PointerEvent) => !isMobile ? onPointerUpHandler(t) : null}
                onPointerMove={(t: PointerEvent) => !isMobile ? onPointerMoveHandler(t) : null}
                onPointerOut={(t: PointerEvent) => !isMobile ? onPointerOutHandler(t) : null}
                onTouchStart={(t: TouchEvent) => isMobile ? onTouchStartHandler(t) : null}
                onTouchEnd={(t: TouchEvent) => isMobile ? onTouchEndHandler(t) : null}
                onTouchMove={(t: TouchEvent) => isMobile ? onTouchMoveHandler(t) : null}
            >
                {mainState.itemToShow && mainState.itemToShow.nodeContent ? mainState.itemToShow.nodeContent : null}
            </AnimatedItem>
            <NavigButton direction={NavigDirection.Right} />
        </AppCtx.Provider>
    )
}

export default Carousel;