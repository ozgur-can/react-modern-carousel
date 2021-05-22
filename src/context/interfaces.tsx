import React from 'react'
import { LinkedList } from '../helper/LinkedList';
export interface IState {
    linkedList?: LinkedList;
    itemToShow?: any;
    items?: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
    pointerValues?: IPointerValues;
    touchValues?: ITouchValues;
    itemIndex?: number;
}
export interface IPointerValues {
    pointerDown?: boolean;
    pointerDownPosX?: number;
}

export interface ITouchValues {
    touchDown?: boolean;
    touchDownPosX?: number;
}

export interface IActionType {
    type: string;
    items?: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
    infinite?: boolean;
    direction?: string;
    pointerValues?: IPointerValues;
    touchValues?: ITouchValues;
    itemIndex?: number;
}

export enum NavigDirection {
    Left = "<",
    Right = ">",
}

export interface IInterval {
    isExist: boolean;
    delay: number | string;
}
export interface ITempTouch {
    posX?: number;
    direction?: NavigDirection;
}