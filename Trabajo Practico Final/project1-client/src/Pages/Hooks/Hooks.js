import { useEffect, useState } from 'react';

const useAllServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('https://servicesscar.herokuapp.com/api/v1/service')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.services);
        setServices(data.data.services);
      });
  }, []);
  return [services, setServices];
};

export default useAllServices;
