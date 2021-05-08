import React, { createContext, useEffect, useReducer } from 'react';
import { IActionType, IState, reducer, state, NavigDirection, setItems } from '../context';
import NavigButton from './NavigButton';
import { AnimatedItem } from './AnimatedItem';
import { initialCSS } from '../helper';
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

    // detects ref changes and draw canvas for text elements
    const onRefChanged = React.useCallback(((node: HTMLCanvasElement) => {
        let ctx: CanvasRenderingContext2D;
        if (node && node.nodeName === "CANVAS") {
            ctx = node.getContext("2d");
            ctx.clearRect(0, 0, 300, 150);
            ctx.font = "30px Arial";
            ctx.fillText(node.textContent, 10, 30);
        }
    }), [mainState.itemToShow]);

    return (
        <AppCtx.Provider value={{ state: mainState, dispatch }}>
            <NavigButton direction={NavigDirection.Left} />
            <AnimatedItem ref={onRefChanged} style={initialCSS}>
                {mainState.itemToShow && mainState.itemToShow.nodeContent ? mainState.itemToShow.nodeContent : null}
            </AnimatedItem>
            <NavigButton direction={NavigDirection.Right} />
        </AppCtx.Provider>
    )
}

export default Carousel;