import React, { createContext, useEffect, useReducer } from 'react';
import { IActionType, IState, reducer, state, NavigDirection, setItems } from '../context';
import NavigButton from './NavigButton';
import { AnimatedItem } from './AnimatedItem';
import BottomNavBar from './BottomNavBar';
export interface CarouselProps {
    infinite: boolean;
}

export const AppCtx = createContext<{ state: IState, dispatch: React.Dispatch<IActionType> }>({ state, dispatch: null });

const Carousel: React.FC<CarouselProps> = ({ infinite, children }) => {
    const [mainState, dispatch] = useReducer(reducer, state);

    useEffect(() => {
        dispatch(setItems(React.Children.toArray(children!), infinite));
        return () => {
            // clean up            
        }
    }, [children]);

    return (
        <AppCtx.Provider value={{ state: mainState, dispatch }}>
            <NavigButton direction={NavigDirection.Left} />
            <AnimatedItem>
                {mainState.itemToShow && mainState.itemToShow.nodeContent ? mainState.itemToShow.nodeContent : null}
            </AnimatedItem>
            <NavigButton direction={NavigDirection.Right} />
            <BottomNavBar/>
        </AppCtx.Provider>
    )
}

export default Carousel;