import React, { createContext, useEffect, useReducer } from 'react';
import { IActionType, IState, reducer, state, setItems, IInterval } from '../context';
import { AnimatedItem } from './AnimatedItem';
import Pagination from './Pagination';
import { textElementTypes } from '../helper';
import NavigButtons from './NavigButtons';
export interface CarouselProps {
    infinite: boolean;
    interval: IInterval;
}

export const AppCtx = createContext<{ state: IState, dispatch: React.Dispatch<IActionType> }>({ state, dispatch: null });

const Carousel: React.FC<CarouselProps> = ({ infinite, children,interval }) => {
    const [mainState, dispatch] = useReducer(reducer, state);
    useEffect(() => {
        if (children) {
            let elements: any = React.Children.toArray(children);
            for (let i = 0; i < elements.length; i++)
                if (textElementTypes.indexOf(elements[i].type) > -1) // if element is text based, create canvas for displaying as carousel item 
                    elements[i] = React.createElement("canvas", { value: elements[i].props.children });

            // add elements to the state after above change
            dispatch(setItems(elements, infinite));
        }
        return () => dispatch(setItems([], infinite))
    }, [children]);

    return (
        <AppCtx.Provider value={{ state: mainState, dispatch }}>
            <AnimatedItem interval={interval}>
                {mainState.itemToShow && mainState.itemToShow.nodeContent ? mainState.itemToShow.nodeContent : null}
            </AnimatedItem>
            <Pagination />
            <NavigButtons />
        </AppCtx.Provider >
    )
}

export default Carousel;