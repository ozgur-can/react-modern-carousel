import React, { useCallback, useContext, memo, useRef } from 'react'
import { navigateToLeft, navigateToRight, NavigDirection, setPointerChanges, setTouchChanges } from '../context';
import { CanvasProps, getObjectPosX, initialCSS, isMobile, nonTextElementTypes, setCssAnimation, textElementTypes } from '../helper';
import { AppCtx } from './Carousel';

export const AnimatedItem = memo<CanvasProps>(({ children }) => {
  const { state, dispatch } = useContext(AppCtx);
  const itemRef = useRef<HTMLCanvasElement>(null);
  let directionX: NavigDirection = null;
  let movementX: number = null;
  let objectPosX: number = null;

  const animatedItemNodeProps = {
    style: initialCSS,
    draggable: false,
    ref: (node: HTMLCanvasElement) => onRefChanged(node),
    onPointerDown: (t: PointerEvent) => !isMobile ? onPointerDownHandler(t) : null,
    onPointerUp: (t: PointerEvent) => !isMobile ? onPointerUpHandler(t) : null,
    onPointerMove: (t: PointerEvent) => !isMobile ? onPointerMoveHandler(t) : null,
    onPointerOut: (t: PointerEvent) => !isMobile ? onPointerOutHandler(t) : null,
    onTouchStart: (t: TouchEvent) => isMobile ? onTouchStartHandler(t) : null,
    onTouchEnd: (t: TouchEvent) => isMobile ? onTouchEndHandler(t) : null,
    onTouchMove: (t: TouchEvent) => isMobile ? onTouchMoveHandler(t) : null
  }

  // detects ref changes and draw canvas for elements
  const onRefChanged = useCallback((node: HTMLCanvasElement) => {
    itemRef.current = node;

    let ctx: CanvasRenderingContext2D;
    if (node) {
      ctx = node.getContext("2d");
      ctx.clearRect(0, 0, node.width, node.height);
      drawCtx((children as any).type, ctx, node);
    }

  }, [state.itemToShow]);

  const drawCtx = (elementType: string, ctx: CanvasRenderingContext2D, node: HTMLCanvasElement) => {

    if (textElementTypes.indexOf(elementType) === -1) {
      let img = new Image();
      img.src = state.itemToShow ? state.itemToShow.nodeContent.props.src : "";
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      }
    }
    else if (nonTextElementTypes.indexOf(elementType) === -1) {
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
  }

  const onPointerDownHandler = (t: PointerEvent) => {
    // set default css, set pointer changes to the store
    itemRef.current.style.transition = "none";
    dispatch(setPointerChanges({ pointerDown: true, pointerDownPosX: t.clientX }));
  }

  const onPointerUpHandler = (t: PointerEvent) => {
    // detect move direction
    if (state.pointerValues && state.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
    else if (state.pointerValues && state.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Right;

    // set pointer changes to the store
    dispatch(setPointerChanges({ pointerDown: false }));

    // get pointer position
    objectPosX = getObjectPosX(itemRef);

    // success - next - pointer up
    if (directionX === NavigDirection.Right && objectPosX > itemRef.current.width) dispatch(navigateToRight());
    // success - prev - pointer up
    else if (directionX === NavigDirection.Left && objectPosX < -itemRef.current.width) dispatch(navigateToLeft());

    setCssAnimation(itemRef);
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
    if (directionX === NavigDirection.Right && objectPosX > itemRef.current.width)
      dispatch(navigateToRight());
    // success - prev - pointer up
    else if (directionX === NavigDirection.Left && objectPosX < -itemRef.current.width)
      dispatch(navigateToLeft());

    setCssAnimation(itemRef);
  }

  const onPointerMoveHandler = (t: PointerEvent) => {
    // get pointer position
    objectPosX = getObjectPosX(itemRef);

    // set new values to css object-position
    if (state.pointerValues && state.pointerValues && state.pointerValues.pointerDown) {
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
    if (directionX === NavigDirection.Right && objectPosX > itemRef.current.width)
      dispatch(navigateToRight());
    // success - prev - mouse up
    else if (directionX === NavigDirection.Left && objectPosX < -itemRef.current.width)
      dispatch(navigateToLeft());

    setCssAnimation(itemRef);
  }

  const onTouchMoveHandler = (t: TouchEvent) => {
    // get touch position
    objectPosX = getObjectPosX(itemRef);

    // get touch move value
    movementX = t.touches[0].clientX - state.touchValues.touchDownPosX;

    // set new values to css object-position
    if (state.touchValues && state.touchValues.touchDown)
      itemRef.current.style.objectPosition = `${objectPosX + movementX / 5}px`;
  }

  if (children) return <canvas {...animatedItemNodeProps} width="300" height="300" {...(children as any).props} />

  else return null;
})