import React from "react";
import Carousel from "./components/Carousel";
import Image1 from "./images/img_1.png";
import Image2 from "./images/img_2.jpeg";
import Image3 from "./images/img_3.png";

const App: React.FC = () => {
    return (
        <Carousel infinite={true}>
            <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores aperiam id reprehenderit nam, tenetur quas Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores aperiam id reprehenderit nam</div>
            <div>ozgur</div>
            <div>can</div>
            <h3>altinok</h3>
            <img src={Image1} alt="1" />
            <img src={Image2} alt="2" />
            <img src={Image3} alt="3" />
        </Carousel >
    )
}
export default App;