import React from "react";
import Carousel from "./components/Carousel";
import Image1 from "./images/img_1.png";
import Image2 from "./images/img_2.jpeg";
import Image3 from "./images/img_3.png";

const App: React.FC = () => {
    return (
        <Carousel infinite={true}>
            <img className="noSelect" draggable={false} src={Image1} alt="1" />
            <img className="noSelect" draggable={false} src={Image2} alt="2" />
            <img className="noSelect" draggable={false} src={Image3} alt="3" />
            <div>item</div>
        </Carousel >
    )
}
export default App;