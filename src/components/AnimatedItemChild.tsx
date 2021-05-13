import React from "react";

const AnimatedItemChild = React.forwardRef<HTMLCanvasElement | HTMLImageElement, any>((props, ref) => {
    if (props.children) {
        if (props.type === "img") {
            const objWithoutChildren = {
                draggable: props.draggable,
                onPointerDown: props.onPointerDown,
                onPointerMove: props.onPointerMove,
                onPointerOut: props.onPointerOut,
                onPointerUp: props.onPointerUp,
                style: props.style,
                src: props.children.props.src
            }
            return React.createElement(props.type, { ...objWithoutChildren, ref })
        }
        else {
            return React.createElement(props.type, { ...props, ref, src: props.children.props.src, controls: true }, props.children)
        }
    }
})

export default AnimatedItemChild;