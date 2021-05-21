import React from "react";
import Carousel from "./components/Carousel";
import Image1 from "./images/famous-painting-1.jpg";
import Image2 from "./images/famous-painting-2.jpg";
import Image3 from "./images/famous-painting-3.jpg";
import "./style/index.scss";

const App: React.FC = () => {
    return (
        <Carousel
            infinite={true}
            interval={{ isExist: false, delay: 3500 }}>
            <div>Without deviation from the norm, progress is not possible.</div>
            <img src={Image2} />
            <video width="320" height="240" src="https://www.w3schools.com/html/mov_bbb.mp4" />
            <b>All the effort in the world won't matter if you're not inspired.</b>
            <img src={Image1} />
            <h2>Every experience has its element of magic.</h2>
            <img src={Image3} />
        </Carousel>
    )
}
export default App;