import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-black transition-all"
    >
      ❯
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-black transition-all"
    >
      ❮
    </div>
  );
}


const ProductSlide = ({ children }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow className={"bg-black text-white font-bold size-7"} />,
    prevArrow: <SamplePrevArrow className={"bg-black text-white font-bold size-7"} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}


export default ProductSlide