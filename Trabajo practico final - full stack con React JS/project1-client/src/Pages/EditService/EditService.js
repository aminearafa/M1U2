import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState();

  useEffect(() => {
    fetch(`https://servicesscar.herokuapp.com/api/v1/service/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data.service);
      });
  });

  const handlerName = (e) => {
    const newName = e.target.value;
    const { name, ...rest } = item;
    const newItem = { name: newName, ...rest };
    setItem(newItem);
  };
  const handleraddIemSubmitt = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const description = e.target.description.value;
    const price = e.target.price.value;

    const supplier_name = e.target.supplier_name.value;

    const item = {
      name,
      image,
      description,
      price,

      supplier_name,
    };
    console.log(item);
    const confirm = window.confirm(
      'Are you Sure that you want to Update this item?',
    );
    if (!confirm) {
      return;
    }
    await axios
      .patch(`https://servicecar.herokuapp.com/api/v1/service/${id}`, {
        item,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    toast('Item Updated');
    navigate('/services');
  };

  return (
    <div>
      <h1>Update Service</h1>
      <form className='w-50 m-auto' onSubmit={handleraddIemSubmitt}>
        <>
          <FloatingLabel
            controlId='floatingInput'
            label='Inventory Item Name'
            className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Name'
              name='name'
              onChange={handlerName}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId='Image' label='Image' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Image'
              name='image'
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='description'
            label='Description'
            className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Description'
              name='description'
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId='price' label='price' className='mb-3'>
            <Form.Control
              type='number'
              placeholder='price'
              name='price'
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId='supplier name,'
            label='supplier name,'
            className='mb-3'>
            <Form.Control
              type='text'
              placeholder='supplier name'
              name='supplier_name'
              required
            />
          </FloatingLabel>

          <input type='submit' className='btn btn-dark' />
        </>
      </form>
    </div>
  );
};

export default EditService;
