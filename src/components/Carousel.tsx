import React, { createContext, useEffect, useReducer } from 'react';
import { IActionType, IState, reducer, state, NavigDirection, setItems } from '../context';
import NavigButton from './NavigButton';
import { AnimatedItem } from './AnimatedItem';
import BottomNavBar from './BottomNavBar';
import { textElementTypes } from '../helper';
export interface CarouselProps {
    infinite: boolean;
}

export const AppCtx = createContext<{ state: IState, dispatch: React.Dispatch<IActionType> }>({ state, dispatch: null });

const Carousel: React.FC<CarouselProps> = ({ infinite, children }) => {
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
            <NavigButton direction={NavigDirection.Left} />
            <AnimatedItem>
                {mainState.itemToShow && mainState.itemToShow.nodeContent ? mainState.itemToShow.nodeContent : null}
            </AnimatedItem>
            <NavigButton direction={NavigDirection.Right} />
            <BottomNavBar />
        </AppCtx.Provider>
    )
}

export default Carousel;