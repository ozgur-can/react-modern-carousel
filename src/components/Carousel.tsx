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
            ctx.clearRect(0, 0, node.width, node.height);
            ctx.font = "bold 17px Garamond";
            const maxWidth = 180;
            const lineHeight = 25;
            const x = (node.width - maxWidth) / 2;
            let y = 30;

            // text wrapping for canvas
            let words = node.textContent.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = ctx.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else line = testLine;
            }

            ctx.fillText(line, x, y);
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