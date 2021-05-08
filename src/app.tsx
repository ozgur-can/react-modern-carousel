import React from "react";
import Carousel from "./components/Carousel";
import Image1 from "./images/img_1.png";
import Image2 from "./images/img_2.jpeg";
import Image3 from "./images/img_3.png";

const App: React.FC = () => {
    return (
        <Carousel infinite={true}>
            <div>ozgur</div>
            <div>can</div>
            <h3>altinok</h3>
            <img src={Image2} alt="2" />
            <img src={Image3} alt="3" />
            <img src={Image1} alt="1" />
        </Carousel >
    )
}
export default App;