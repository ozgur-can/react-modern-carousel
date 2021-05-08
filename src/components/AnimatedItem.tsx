import React, { MutableRefObject, useContext } from 'react'
import { navigateToLeft, navigateToRight, NavigDirection, setPointerChanges, setTouchChanges } from '../context';
import { CanvasProps, ImgProps, isMobile, setCssAnimation } from '../helper';
import { AppCtx } from './Carousel';

export const AnimatedItem = React.memo(React.forwardRef<HTMLImageElement | HTMLCanvasElement, ImgProps | CanvasProps>(({ children, style }, ref) => {
  const { state, dispatch } = useContext(AppCtx);
  let itemRef = React.useRef<HTMLImageElement | HTMLCanvasElement>(null);
  let directionX: NavigDirection = null;
  let movementX: number = null;
  let objectPosX: number = null;

  const getObjectPosX = (): number => parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0])

  const onPointerDownHandler = (t: PointerEvent) => {
    // set default css, set pointer changes to the store
    itemRef.current.style.transition = "none";
    dispatch(setPointerChanges({ pointerDown: true, pointerDownPosX: t.clientX }));
  }

  const setRef = (node: HTMLImageElement | HTMLCanvasElement) => {
    itemRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as MutableRefObject<HTMLImageElement | HTMLCanvasElement>).current = node;
    }
  }

  const onPointerUpHandler = (t: PointerEvent) => {
    // detect move direction
    if (state.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
    else if (state.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Right;

    // set pointer changes to the store
    dispatch(setPointerChanges({ pointerDown: false }));

    // get pointer position
    objectPosX = getObjectPosX();

    // success - next - pointer up
    if (directionX === NavigDirection.Right && objectPosX > itemRef.current.width) dispatch(navigateToRight());
    // success - prev - pointer up
    else if (directionX === NavigDirection.Left && objectPosX < -itemRef.current.width) dispatch(navigateToLeft());

    setCssAnimation(itemRef);
  }

  const onPointerOutHandler = (t: PointerEvent) => {
    // detect move direction
    if (state.pointerValues.pointerDownPosX < t.clientX) directionX = NavigDirection.Right;
    else if (state.pointerValues.pointerDownPosX > t.clientX) directionX = NavigDirection.Left;

    // set pointer changes to the store
    dispatch(setPointerChanges({ pointerDown: false }));

    // get pointer position
    objectPosX = getObjectPosX();

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
    objectPosX = getObjectPosX();

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
    objectPosX = getObjectPosX();

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
    objectPosX = getObjectPosX();

    // get touch move value
    movementX = t.touches[0].clientX - state.touchValues.touchDownPosX;

    // set new values to css- object-position
    if (state.touchValues && state.touchValues.touchDown)
      itemRef.current.style.objectPosition = `${objectPosX + movementX / 5}px`;
  }


  if (children && (children as any).type === "img") {
    return <img src={(children as any).props} alt=""
      {...(children as any).props}
      ref={(node) => setRef(node)}
      draggable={false}
      style={style}
      onPointerDown={(t: PointerEvent) => !isMobile ? onPointerDownHandler(t) : null}
      onPointerUp={(t: PointerEvent) => !isMobile ? onPointerUpHandler(t) : null}
      onPointerMove={(t: PointerEvent) => !isMobile ? onPointerMoveHandler(t) : null}
      onPointerOut={(t: PointerEvent) => !isMobile ? onPointerOutHandler(t) : null}
      onTouchStart={(t: TouchEvent) => isMobile ? onTouchStartHandler(t) : null}
      onTouchEnd={(t: TouchEvent) => isMobile ? onTouchEndHandler(t) : null}
      onTouchMove={(t: TouchEvent) => isMobile ? onTouchMoveHandler(t) : null} />
  }
  else if (children && (children as any).type !== "img") {
    return <canvas
      {...(children as any).props}
      ref={(node) => setRef(node)}
      draggable={false}
      style={style}
      onPointerDown={(t: PointerEvent) => !isMobile ? onPointerDownHandler(t) : null}
      onPointerUp={(t: PointerEvent) => !isMobile ? onPointerUpHandler(t) : null}
      onPointerMove={(t: PointerEvent) => !isMobile ? onPointerMoveHandler(t) : null}
      onPointerOut={(t: PointerEvent) => !isMobile ? onPointerOutHandler(t) : null}
      onTouchStart={(t: TouchEvent) => isMobile ? onTouchStartHandler(t) : null}
      onTouchEnd={(t: TouchEvent) => isMobile ? onTouchEndHandler(t) : null}
      onTouchMove={(t: TouchEvent) => isMobile ? onTouchMoveHandler(t) : null}
    >
      {children}
    </canvas>
  }
  else return null;
}))