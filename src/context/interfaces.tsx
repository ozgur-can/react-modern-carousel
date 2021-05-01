import React from 'react'
import { LinkedList } from '../helper/LinkedList';
export interface IState {
    linkedList: LinkedList;
    itemToShow?: any;
    items?: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
    itemDirection?: string; 
    pointerValues?: IPointerValues;
}
export interface IPointerValues {
    pointDown?: boolean;
    pointDownPosX?: number;
}
export interface IActionType{
    type: string;
    items?: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
    infinite?: boolean;
    direction?: string;
    pointerValues?: IPointerValues;
}

export enum NavigDirection {
    Left = "<",
    Right = ">",
}