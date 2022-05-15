import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css';
const Services = () => {
  const [services, setServices] = useState([]);

  const size = 3;
  const items = services.slice(0, size);

  useEffect(() => {
    fetch('https://servicesscar.herokuapp.com/api/v1/service')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.services);
        setServices(data.data.services);
      });
  }, []);
  return (
    <div className='services-container container'>
      {items.map((service) => (
        <Service service={service}></Service>
      ))}
    </div>
  );
};

export default Services;
