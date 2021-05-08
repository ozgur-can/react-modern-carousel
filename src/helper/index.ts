// checks device whether mobile or not
export const isMobile: boolean = navigator.userAgent.indexOf("Mobi") > -1;

// animated item animation
export const setCssAnimation = (
  itemRef: React.MutableRefObject<HTMLImageElement | HTMLCanvasElement>
) => {
  itemRef.current.style.objectPosition = "0px";
  itemRef.current.style.transition = "all 400ms ease-out";
};

// animated prop types
export type ImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
export type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;

// animated item initial css
export const initialCSS: React.CSSProperties = {
    position: "relative",
    objectFit: "none",
    objectPosition: "0px",
};