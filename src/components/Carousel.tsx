import React, { createContext, useReducer } from 'react'
import { IActionType, IState, reducer, state, NavigDirection } from '../context';
import NavigButton from './NavigButton';

export interface CarouselProps {
}

export const AppCtx = createContext<{ state: IState, dispatch: React.Dispatch<IActionType> }>({ state: state, dispatch: null });

const Carousel: React.FC<CarouselProps> = (props) => {
    const [mainState, dispatch] = useReducer(reducer, state);

    const child = React.Children.toArray(props.children!)[mainState.counter] as React.ReactElement;

    return (
        <AppCtx.Provider value={{ state: mainState, dispatch }}>
            <NavigButton direction={NavigDirection.Left}/>
            {child ? React.cloneElement(child) : null}
            <NavigButton direction={NavigDirection.Right}/>
        </AppCtx.Provider>
    )
}

export default Carousel;