import React, { useContext, useRef, useEffect } from 'react'
import { navigateToLeft, navigateToRight, NavigDirection, setPointerChanges, setTouchChanges } from '../context';
import { carouselCSS, getObjectPosX, initialCSS, isMobile, setCssAnimationDefault, setCssAnimationOnload } from '../helper';
import AnimatedItemChild from './AnimatedItemChild';
import { AppCtx } from './Carousel';

export const AnimatedItem: React.FC = ({ children }) => {
  const { state, dispatch } = useContext(AppCtx);
  let itemRef = useRef<HTMLImageElement | HTMLCanvasElement | HTMLVideoElement>(null);
  let directionX: NavigDirection = null;
  let movementX: number = null;
  let objectPosX: number = null;

  useEffect(() => {
    if (itemRef && itemRef.current) {
      if (itemRef.current.nodeName === "CANVAS") {
        // set onload animation here because <canvas> doesn't support onload event
        setCssAnimationOnload(itemRef);
        let ctx: CanvasRenderingContext2D;
        ctx = ((itemRef.current) as HTMLCanvasElement).getContext("2d");
        ctx.clearRect(0, 0, itemRef.current.width, itemRef.current.height);
        ctx.font = "bold 17px Garamond";
        const textValue = itemRef.current.innerHTML.replace(/canvas|<|>|value|"|=/g, "").split("/")[0];

        const maxWidth = 180;
        const lineHeight = 25;
        const x = (itemRef.current.width - maxWidth) / 2;
        let y = 30;

        // text wrapping for canvas
        const words = textValue.split(' ');
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
    }

    return () => { }

  }, [state.itemToShow]);

  const animatedItemNodeProps = {
    style: initialCSS,
    draggable: false,
    onPointerDown: (t: PointerEvent) => !isMobile ? onPointerDownHandler(t) : null,
    onPointerUp: (t: PointerEvent) => !isMobile ? onPointerUpHandler(t) : null,
    onPointerMove: (t: PointerEvent) => !isMobile ? onPointerMoveHandler(t) : null,
    onPointerOut: (t: PointerEvent) => !isMobile ? onPointerOutHandler(t) : null,
    onTouchStart: (t: TouchEvent) => isMobile ? onTouchStartHandler(t) : null,
    onTouchEnd: (t: TouchEvent) => isMobile ? onTouchEndHandler(t) : null,
    onTouchMove: (t: TouchEvent) => isMobile ? onTouchMoveHandler(t) : null
  }

  const onPointerDownHandler = (t: PointerEvent) => {
    // set default css, set pointer changes to the store
    itemRef.current.style.transition = "none";
    dispatch(setPointerChanges({ pointerDown: true, pointerDownPosX: t.clientX }));
  }

  const onPointerUpHandler = (t: PointerEvent) => {
    // detect move direction
    if (state.pointerValues && state.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
    else if (state.pointerValues && state.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Left;

    // set pointer changes to the store
    dispatch(setPointerChanges({ pointerDown: false }));

    // get pointer position
    objectPosX = getObjectPosX(itemRef);

    // success - next - pointer up
    if (directionX === NavigDirection.Right && objectPosX > parseFloat(itemRef.current.style.width)) dispatch(navigateToRight());
    // success - prev - pointer up
    if (directionX === NavigDirection.Left && objectPosX < -parseFloat(itemRef.current.style.width)) dispatch(navigateToLeft());

    setCssAnimationDefault(itemRef);
  }

  const onPointerOutHandler = (t: PointerEvent) => {
    // detect move direction
    if (state.pointerValues && state.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
    else if (state.pointerValues && state.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Left;

    // set pointer changes to the store
    dispatch(setPointerChanges({ pointerDown: false }));

    // get pointer position
    objectPosX = getObjectPosX(itemRef);

    // success - next - pointer up
    if (directionX === NavigDirection.Right && objectPosX > parseFloat(itemRef.current.style.width)) dispatch(navigateToRight());
    // success - prev - pointer up
    if (directionX === NavigDirection.Left && objectPosX < -parseFloat(itemRef.current.style.width)) dispatch(navigateToLeft());

    setCssAnimationDefault(itemRef);
  }

  const onPointerMoveHandler = (t: PointerEvent) => {
    // get pointer position
    objectPosX = getObjectPosX(itemRef);

    // set new values to css object-position
    if (state.pointerValues && state.pointerValues.pointerDown) {
      itemRef.current.style.objectPosition = `${objectPosX + 2 * t.movementX}px`;
    }
  }

  const onTouchStartHandler = (t: TouchEvent) => {
    // set default css, set touch changes to the store
    itemRef.current.style.transition = "none";
    dispatch(setTouchChanges({ touchDown: true, touchDownPosX: t.touches[0].clientX }));
  }

  const onTouchEndHandler = (t: TouchEvent) => {
    // detect move direction
    if (t.changedTouches[0].clientX - state.touchValues.touchDownPosX < 0) directionX = NavigDirection.Left;
    else if (t.changedTouches[0].clientX - state.touchValues.touchDownPosX > 0) directionX = NavigDirection.Right;

    // set touch changes to the store
    dispatch(setTouchChanges({ touchDown: false }));

    // get touch position
    objectPosX = getObjectPosX(itemRef);

    // success - next - mouse up
    if (directionX === NavigDirection.Right && objectPosX > parseFloat(itemRef.current.style.width))
      dispatch(navigateToRight());
    // success - prev - mouse up
    else if (directionX === NavigDirection.Left && objectPosX < -parseFloat(itemRef.current.style.width))
      dispatch(navigateToLeft());

    setCssAnimationDefault(itemRef);
  }

  const onTouchMoveHandler = (t: TouchEvent) => {
    // get touch position
    objectPosX = getObjectPosX(itemRef);

    // get touch move value
    movementX = t.touches[0].clientX - state.touchValues.touchDownPosX;

    // set new values to css object-position
    if (state.touchValues && state.touchValues.touchDown)
      itemRef.current.style.objectPosition = `${objectPosX + movementX / 35}px`;
  }

  if (children) return (
    <div style={carouselCSS}>
      <AnimatedItemChild {...animatedItemNodeProps} ref={itemRef} type={(children as any).type}>
        {children}
      </AnimatedItemChild>
    </div>
  )
  else return null;
}