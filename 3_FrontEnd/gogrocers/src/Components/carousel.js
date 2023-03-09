/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import img1 from '../Images/About.jpg'
import img2 from '../Images/home1.jpg'
import img3 from '../Images/home4.jpg'
class Scrolling extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          showStatus={false}
        >
          <div >
            <img
            
              src={img1}
              height="600px"
            />
          </div>
          <div>
            <img
              src={img2}
              height="600px"
            />
          </div>
          <div>
            <img
              src={img3}
              height="600px"
            />
          </div>
        </Carousel>
      </React.Fragment>
    );
  }
}

export default Scrolling;
