import React from "react";
import Carousel from "./components/Carousel";
import Image1 from "./images/img_1.png";
import Image2 from "./images/img_2.jpeg";
import Image3 from "./images/img_3.png";

const App: React.FC = () => {
    return (
        <Carousel
            infinite={false}
            wrapper={false}
        >
            <img src={Image1} alt="1" />
            <img src={Image2} alt="2" />
            <img src={Image3} alt="3" />
        </Carousel >
    )
}
export default App;