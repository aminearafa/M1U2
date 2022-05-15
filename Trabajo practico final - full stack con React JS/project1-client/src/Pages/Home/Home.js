import React from 'react';
import { Link } from 'react-router-dom';
import Services from '../Services/Services';
import Banner from './Banner/Banner';
import './Home.css';
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <h1>Our Services</h1>
      <div className=''>
        <Services></Services>
        <Link to='/services'>
          <button className='btn btn-dark mt-5'>See all services</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
