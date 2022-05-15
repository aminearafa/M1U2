import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../Service/Service';
import './AllServices.css';
const AllServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
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
      {services.map((service) => (
        <Service service={service}></Service>
      ))}
    </div>
  );
};

export default AllServices;
