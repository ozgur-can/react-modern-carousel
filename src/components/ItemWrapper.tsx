import React from "react";

export interface ItemWrapperProps {

}

const ItemWrapper: React.FC<ItemWrapperProps> = (props) => {
    return (
        <>
            {props.children}
        </>
    );
}

export default ItemWrapper;