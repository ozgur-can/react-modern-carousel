import React, { useCallback } from "react";
import { setCssAnimationEnd, setCssAnimationOnload } from "../helper";

const AnimatedItemChild = React.forwardRef<HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, any>((props, ref) => {
    const childRef = React.useRef<HTMLImageElement | HTMLCanvasElement | HTMLVideoElement>(null);

    const useChildRef = useCallback((node: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => {
        if (node) {
            childRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }
    }, [ref]);

    const getSpecificProps = (obj: any, toFilter?: string[]) => {
        let result = {};
        if (toFilter) result = Object.fromEntries(Object.entries(obj).filter(([key]) => toFilter.indexOf(key) > -1));
        return result;
    }

    if (props.children) {
        if (props.type === "img") {
            return React.createElement(props.type, {
                ...getSpecificProps(props, ["onPointerDown", "onPointerMove", "onPointerOut", "onPointerUp", "onTouchStart", "onTouchEnd", "onTouchMove", "draggable"]),
                onLoad: () => setCssAnimationOnload(childRef),
                onAnimationEnd: () => setCssAnimationEnd(childRef),
                ref: (node: HTMLImageElement) => useChildRef(node),
                style: { ...props.style, objectFit: "fill" },
                src: props.children.props.src
            })
        } else if (props.type === "canvas") {
            return React.createElement(props.type, {
                ...getSpecificProps(props, ["onPointerDown", "onPointerMove", "onPointerOut", "onPointerUp", "onTouchStart", "onTouchEnd", "onTouchMove", "style", "draggable"]),
                onAnimationEnd: () => setCssAnimationEnd(childRef),
                ref: (node: HTMLCanvasElement) => useChildRef(node),
                value: props.children.props.value
            });
        } else if (props.type === "video") {
            return React.createElement(props.type, {
                ...getSpecificProps(props, ["onPointerDown", "onPointerMove", "onPointerOut", "onPointerUp", "onTouchStart", "onTouchEnd", "onTouchMove", "draggable"]),
                onLoadStart: () => setCssAnimationOnload(childRef),
                onAnimationEnd: () => setCssAnimationEnd(childRef),
                ref: (node: HTMLVideoElement) => useChildRef(node),
                style: { ...props.style, objectFit: "contain" },
                src: props.children.props.src,
                controls: true,
            });
        }
    }
})

export default AnimatedItemChild;