import axios from 'axios';
import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Additem = () => {
  const navigate = useNavigate();
  const handleraddIemSubmit = async (e) => {
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
      'Are you Sure that you want to Add this item?',
    );
    if (!confirm) {
      return;
    }
    await axios
      .post('https://servicesscar.herokuapp.com/api/v1/service', {
        item,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    toast('Item added');
    navigate('/services');
  };

  return (
    <div>
      <h1>Add Service</h1>
      <form className='w-50 m-auto' onSubmit={handleraddIemSubmit}>
        <>
          <FloatingLabel
            controlId='floatingInput'
            label='Inventory Item Name'
            className='mb-3'>
            <Form.Control type='text' placeholder='Name' name='name' />
          </FloatingLabel>
          <FloatingLabel controlId='Image' label='Image' className='mb-3'>
            <Form.Control type='text' placeholder='Image' name='image' />
          </FloatingLabel>
          <FloatingLabel
            controlId='description'
            label='Description'
            className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Description'
              name='description'
            />
          </FloatingLabel>
          <FloatingLabel controlId='price' label='price' className='mb-3'>
            <Form.Control type='number' placeholder='price' name='price' />
          </FloatingLabel>

          <FloatingLabel
            controlId='supplier name,'
            label='supplier name,'
            className='mb-3'>
            <Form.Control
              type='text'
              placeholder='supplier name'
              name='supplier_name'
            />
          </FloatingLabel>

          <input type='submit' className='btn btn-dark' />
        </>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Additem;
