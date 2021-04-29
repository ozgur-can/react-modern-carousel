import React, { createContext, useEffect, useReducer } from 'react';
import { IActionType, IState, reducer, state, NavigDirection, setItems } from '../context';
import NavigButton from './NavigButton';
export interface CarouselProps {
    infinite: boolean;
    wrapper: boolean;
}

export const AppCtx = createContext<{ state: IState, dispatch: React.Dispatch<IActionType> }>({ state: state, dispatch: null });

const Carousel: React.FC<CarouselProps> = ({ wrapper, infinite, children }) => {
    const [mainState, dispatch] = useReducer(reducer, state);

    useEffect(() => {
        if (!wrapper) dispatch(setItems(React.Children.toArray(children!), infinite));
        return () => {
            // clean up
        }
    }, [children]);

    return (
        <AppCtx.Provider value={{ state: mainState, dispatch }}>
            <NavigButton direction={NavigDirection.Left} />
            <img src={mainState.itemToShow ? mainState.itemToShow.imgSrc : null} alt="img" />
            <NavigButton direction={NavigDirection.Right} />
        </AppCtx.Provider>
    )
}

export default Carousel;