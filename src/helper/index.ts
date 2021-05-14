// checks device whether mobile or not
export const isMobile: boolean = navigator.userAgent.indexOf("Mobi") > -1;

// animated item animation
export const setCssAnimation = (
  itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>
) => {
  itemRef.current.style.objectPosition = "0px";
};

export const setCssAnimationDefault = (
  itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>
) => {
  itemRef.current.style.objectPosition = "0px";
  itemRef.current.style.transition = "all 200ms ease-out";
};

export const setCssAnimationOnload = (
  itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>
) => {
  itemRef.current.style.objectPosition = "0px";
  itemRef.current.style.animation = "anim 0.4s linear";
};

export const setCssAnimationEnd = (
  itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>
) => {
  itemRef.current.style.animation = undefined;
};

export const getObjectPosX = (
  itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>
): number =>
  parseFloat(itemRef.current.style.objectPosition.split(" ")[0].split("px")[0]);

// animated prop types
export type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
export type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;
export type DivProps = React.DetailedHTMLProps<React.HTMLProps<HTMLDivElement>, HTMLDivElement>;

// animated item initial css
export const initialCSS: React.CSSProperties = {
  width: 300,
  height: 300,
  position: "relative",
  objectFit: "none",
  objectPosition: "0px",
  userSelect: "none",
  borderRadius: "5px",
};

export const textElementTypes: string[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "div",
  "p",
  "span",
  "strong",
  "em",
  "blockquote",
  "code",
  "pre",
  "mark",
  "ins",
  "del",
  "sup",
  "sub",
  "small",
  "i",
  "b",
  "a",
];