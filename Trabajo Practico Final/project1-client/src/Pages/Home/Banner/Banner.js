import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const Banner = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://maserati.scene7.com/is/image/maserati/maserati/international/Models/my22/grecale/my22/modena/169/Maserati_Grecale_Modena_FULL_FRONT.jpg?$1920x2000$&fit=constrain'
          alt='First slide'
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://stimg.cardekho.com/images/carexteriorimages/930x620/Lamborghini/Aventador/6721/Lamborghini-Aventador-SVJ/1621849426405/front-left-side-47.jpg?tr=w-375'
          alt='Second slide'
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://www.focus2move.com/wp-content/uploads/2021/02/Bugatti-Divo_Lady_Bug-2020-1024-0b.jpg'
          alt='Third slide'
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
