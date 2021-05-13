// checks device whether mobile or not
export const isMobile: boolean = navigator.userAgent.indexOf("Mobi") > -1;

// animated item animation
export const setCssAnimation = (
  itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>
) => {
  itemRef.current.style.objectPosition = "0px";
  itemRef.current.style.animation = "shake 1s linear"
  itemRef.current.classList.add("shake");
};

export const setCssAnimationDefault = (
  itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>
) => {
  itemRef.current.style.objectPosition = "0px";
  itemRef.current.style.transition = "all 400ms ease-out";
  itemRef.current.style.animation = undefined;
  itemRef.current.classList.remove("shake");
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
  border: "1px solid black",
  borderRadius: "12px",
  animation: "shake 1s linear",
};

export const setInitialCSS = (itemRef: React.MutableRefObject<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>) => {
  itemRef.current.style.width = "300px";
  itemRef.current.style.height = "300px";
  itemRef.current.style.position = "relative";
  itemRef.current.style.objectFit = "none";
  itemRef.current.style.objectPosition = "0px";
  itemRef.current.style.userSelect = "none";
  itemRef.current.style.border = "1px solid black";
  itemRef.current.style.borderRadius = "12px";
  itemRef.current.style.animation = "shake 1s linear";
}

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
