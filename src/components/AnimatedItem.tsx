import React from 'react'

type ImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;

interface AnimatedItemState {
  type: string;
  props: any;
}

export const AnimatedItem = React.forwardRef<HTMLImageElement | HTMLCanvasElement, ImgProps | CanvasProps>(({ children, onPointerDown, onPointerUp, onPointerMove, onPointerOut, onTouchStart, onTouchEnd, onTouchMove }, ref) => {
  const [itemState, setItemState] = React.useState<AnimatedItemState>();

  React.useEffect(() => {
    // set type and props
    if (children) setItemState({ type: (children as any).type, props: (children as any).props })

    return () => setItemState(undefined);
  }, [children])

  return (
    <>
      {itemState ? React.createElement(itemState.type, { ...itemState.props, onPointerDown, onPointerUp, onPointerMove, onPointerOut, onTouchStart, onTouchEnd, onTouchMove, ref: ref }) : null}
    </>
  )
})