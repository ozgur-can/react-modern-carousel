import React, { useContext, useRef, useEffect, useState } from 'react'
import { IInterval, ITempTouch, navigateToLeft, navigateToRight, NavigDirection, setPointerChanges, setTouchChanges } from '../context';
import { carouselCSS, getObjectPosX, initialCSS, isMobile, setCssAnimationDefault, setCssAnimationOnload, useInterval } from '../helper';
import AnimatedItemChild from './AnimatedItemChild';
import { AppCtx } from './Carousel';

export const AnimatedItem: React.FC<{ interval: IInterval }> = ({ children, interval }) => {
  const { state, dispatch } = useContext(AppCtx);
  let itemRef = useRef<HTMLImageElement | HTMLCanvasElement | HTMLVideoElement>(null);
  const [tempTouch, setTempTouch] = useState<ITempTouch>({ posX: null });
  interval.isExist ? useInterval(interval.delay) : null;

  let directionX: NavigDirection = null;
  let movementX: number = null;
  let objectPosX: number = null;

  useEffect(() => {
    if (itemRef && itemRef.current) {
      if (itemRef.current.nodeName === "CANVAS")
        updateCanvas();
    }
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

  const updateCanvas = () => {
    // set onload animation here because <canvas> doesn't support onload event
    setCssAnimationOnload(itemRef);
    let ctx: CanvasRenderingContext2D;
    ctx = ((itemRef.current) as HTMLCanvasElement).getContext("2d");
    ctx.clearRect(0, 0, itemRef.current.width, itemRef.current.height);
    ctx.font = "bold 18px Times New Roman";

    // get text in node
    const textRegex = /value=\"([^"]*)\"/;
    const textValue = textRegex.exec(itemRef.current.outerHTML)[1];
    const maxWidth = !isMobile ? carouselCSS.width as number / 2 : window.innerWidth / 2;
    const lineHeight = 25;
    const x = !isMobile ? maxWidth / 2 : ((itemRef.current.width - maxWidth) / 1.5);
    let y = carouselCSS.height as number / 10;

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

    // get item position
    objectPosX = getObjectPosX(itemRef);

    // success - next - pointer up
    if (directionX === NavigDirection.Right && objectPosX > parseFloat(itemRef.current.style.width)) dispatch(navigateToLeft());
    // success - prev - pointer up
    if (directionX === NavigDirection.Left && objectPosX < -parseFloat(itemRef.current.style.width)) dispatch(navigateToRight());

    setCssAnimationDefault(itemRef);
  }

  const onPointerOutHandler = (t: PointerEvent) => {
    // detect move direction
    if (state.pointerValues && state.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
    else if (state.pointerValues && state.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Left;

    // set pointer changes to the store
    dispatch(setPointerChanges({ pointerDown: false }));

    // get item position
    objectPosX = getObjectPosX(itemRef);

    // success - next - pointer up
    if (directionX === NavigDirection.Right && objectPosX > parseFloat(itemRef.current.style.width)) dispatch(navigateToLeft());
    // success - prev - pointer up
    if (directionX === NavigDirection.Left && objectPosX < -parseFloat(itemRef.current.style.width)) dispatch(navigateToRight());

    setCssAnimationDefault(itemRef);
  }

  const onPointerMoveHandler = (t: PointerEvent) => {
    // get item position
    objectPosX = getObjectPosX(itemRef);

    // set new values to css object-position
    if (state.pointerValues && state.pointerValues.pointerDown) {
      itemRef.current.style.objectPosition = `${objectPosX + 2 * t.movementX}px`;
    }
  }

  const onTouchStartHandler = (t: TouchEvent) => {
    // set default css
    itemRef.current.style.transition = "none";
  }

  const onTouchEndHandler = (t: TouchEvent) => {
    // set touch changes to the store
    dispatch(setTouchChanges({ touchDown: false }));

    // get item position
    objectPosX = getObjectPosX(itemRef);

    // success - next - mouse up
    if (tempTouch.direction === NavigDirection.Right && objectPosX > itemRef.current.width * 2 / 3) dispatch(navigateToLeft());
    // success - prev - mouse up
    else if (tempTouch.direction === NavigDirection.Left && objectPosX < -itemRef.current.width * 2 / 3) dispatch(navigateToRight());

    setCssAnimationDefault(itemRef);
  }

  const onTouchMoveHandler = (t: TouchEvent) => {
    //  indicate move direction, previous and current touch values changings
    if (tempTouch && (tempTouch.posX > t.changedTouches[0].clientX))
      setTempTouch({ posX: t.changedTouches[0].clientX, direction: NavigDirection.Left })

    else if (tempTouch && (tempTouch.posX < t.changedTouches[0].clientX))
      setTempTouch({ posX: t.changedTouches[0].clientX, direction: NavigDirection.Right })

    // set first touch to local touch state(tempTouch)
    if (!tempTouch.posX) setTempTouch({ posX: t.changedTouches[0].clientX });

    // set every current touch to store to make it behaves carousel item as untouched when stop moving our finger while we still touching
    dispatch(setTouchChanges({ touchDown: true, touchDownPosX: t.changedTouches[0].clientX }));

    // calculate the difference between the current position and the last stopped position as we set above
    if (state.touchValues && state.touchValues.touchDownPosX)
      // movementX -> equivalent of PointerEvent's movementX
      movementX = Math.round(t.changedTouches[0].clientX - state.touchValues.touchDownPosX);

    // get item position
    objectPosX = getObjectPosX(itemRef);

    // set new values to css object-position
    if (state.touchValues && state.touchValues.touchDown)
      itemRef.current.style.objectPosition = `${objectPosX + movementX}px`;
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