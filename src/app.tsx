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
            interval={{ isExist: true, delay: 3500 }}>
            <img src={Image1} />
            <h1>The line between failure and success is so fine. . . that we are often on the line and do not know it.</h1>
            <video width="320" height="240" src="https://www.w3schools.com/html/movie.mp4" />
            <strong>No matter how thin you slice it, there will always be two sides.</strong>
            <p>Action may not always bring happiness, but there is no happiness without action.</p>
            <img src={Image2} />
            <h1>A day without laughter is a day wasted.</h1>
            <img src={Image3} />
            <div>Without deviation from the norm, progress is not possible.</div>
            <div>All the effort in the world won't matter if you're not inspired.</div>
            <div>Every experience has its element of magic.</div>
            <div>A mind is like a parachute. It doesn't work if it is not open.</div>
            <div>Quiet people have the loudest minds.</div>
        </Carousel>
    )
}
export default App;