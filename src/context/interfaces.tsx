import React from 'react'
import { LinkedList } from '../helper/LinkedList';

export interface IState {
    linkedList: LinkedList;
    itemToShow?: any;
    items?: (React.ReactChild | React.ReactFragment | React.ReactPortal)[]
}

export interface IActionType{
    type: string;
    items?: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
    infinite?: boolean;
}

export enum NavigDirection {
    Left = "<",
    Right = ">",
}