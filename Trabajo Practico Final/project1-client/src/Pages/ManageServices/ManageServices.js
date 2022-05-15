import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useAllServices from '../Hooks/Hooks';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://servicesscar.herokuapp.com/api/v1/service')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.services);
        setServices(data.data.services);
      });
  }, [services]);
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async (id) => {
    const data = await axios(
      `https://servicesscar.herokuapp.com/api/v1/service/${id}`,
      {
        method: 'DELETE',
      },
    );
    setServices(services);
    toast('Item Deleted');
  };
  return (
    <div className='container'>
      <Table striped bordered hover variant='dark' responsive>
        <thead>
          <tr>
            <th> Name</th>
            <th> Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>supplier_name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <td>{service.description}</td>
              <td>{service.image}</td>
              <td>{service.supplier_name}</td>
              <td>
                <button
                  className='btn btn-success'
                  onClick={() => handleEdit(service._id)}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(service._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to='/additem'>
        <button className='btn btn-dark'>Add Service</button>
      </Link>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManageServices;
