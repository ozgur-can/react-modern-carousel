import React from "react";
import Carousel from "./components/Carousel";
import Image1 from "./images/famous-painting-1.jpg";
import Image2 from "./images/famous-painting-2.jpg";
import Image3 from "./images/famous-painting-3.jpg";
import "./style/index.scss";

const images = [
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
    "https://akademi.bilgeadam.com/wp-content/uploads/2021/11/react.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Grant_Wood_-_Fall_Plowing.jpg"
]

const App: React.FC = () => {
    return (
        <Carousel
            infinite={true}
            interval={{ isExist: false, delay: 3500 }}>
            <div>Without deviation from the norm, progress is not possible.</div>
            <img src={images[0]} />
            <video width="320" height="240" src="https://www.w3schools.com/html/mov_bbb.mp4" />
            <b>All the effort in the world won't matter if you're not inspired.</b>
            <img src={images[1]} />
            <h2>Every experience has its element of magic.</h2>
            <img src={images[2]} />
        </Carousel>
    )
}
export default App;