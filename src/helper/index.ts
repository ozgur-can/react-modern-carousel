// checks device whether mobile or not
export const isMobile: boolean = navigator.userAgent.indexOf("Mobi") > -1;

// animated item animation
export const setCssAnimation = (
  itemRef: React.MutableRefObject<HTMLImageElement | HTMLCanvasElement>
) => {
  itemRef.current.style.objectPosition = "0px";
  itemRef.current.style.transition = "all 400ms ease-out";
};

export const getObjectPosX = (
  itemRef: React.MutableRefObject<HTMLImageElement | HTMLCanvasElement>
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

// animated item initial css
export const initialCSS: React.CSSProperties = {
  position: "relative",
  objectFit: "none",
  objectPosition: "0px",
  userSelect: "none",
  border: "1px solid black",
  borderRadius: "12px",
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

export const nonTextElementTypes: string[] = ["img", "video"];
