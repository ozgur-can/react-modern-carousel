import React from "react";
import Carousel from "./components/Carousel";
import Image1 from "./images/famous-painting-1.jpg";
import Image2 from "./images/famous-painting-2.jpg";
import Image3 from "./images/famous-painting-3.jpg";
import "./style/index.scss";

const App: React.FC = () => {
    return (
        <Carousel infinite={true}>
            <img src={Image1} />
            <h1>The line between failure and success is so fine. . . that we are often on the line and do not know it.</h1>
            <video width="320" height="240" src="https://www.w3schools.com/html/movie.mp4" />
            <img src={Image2} />
            <img src={Image3} />
            <div>Without deviation from the norm, progress is not possible.</div>
        </Carousel>
    )
}
export default App;