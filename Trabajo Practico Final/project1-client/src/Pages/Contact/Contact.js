import axios from 'axios';
import React from 'react';
import { Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {
  return (
    <div className='container w-50 m-auto'>
      <form
        action='mailto: casoadigital@gmail.com'
        method='post'
        enctype='text/plain'>
        <br />
        <h1>Name</h1>
        <input type='text' name='name' className='form-control' />
        <br />
        <br />
        <h1>Your Email</h1>
        <input type='text' name='mail' className='form-control' />
        <br />
        <br />
        <h1>Your Message</h1>
        <input type='text' name='comment' size='50' className='form-control' />
        <br />
        <br />
        <input type='submit' value='Send' className='btn btn-primary' />
        <input type='reset' value='Reset' className='btn btn-primary' />
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Contact;
