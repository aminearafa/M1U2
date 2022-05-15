import axios from 'axios';
import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import GoogleLogin from '../SocialLogin/GoogleLogin';

const Signup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || '/';
  if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <img
          src='https://c.tenor.com/1s1_eaP6BvgAAAAC/rainbow-spinner-loading.gif'
          alt=''
          width='30%'
          height='30%'
        />
      </div>
    );
  }
  if (user) {
    navigate(from, { replace: true });
  }
  if (error) {
    alert('Already exist this user');
    console.log(error);
  }
  // if (user) {
  //   return (
  //     <div>
  //       <p>Registered User: {user.email}</p>
  //     </div>
  //   );
  // }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };
    createUserWithEmailAndPassword(email, password);
    // const { data } = await axios.post(
    //   'https://phinventory.herokuapp.com/login',
    //   { email },
    // );
    // localStorage.setItem('accessToken', data.accessToken);
  };
  return (
    <div>
      <h1 className='text-center'>Signup here</h1>
      <form onSubmit={handlerSubmit} className='m-auto w-50'>
        <div className='mb-3'>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            name='email'
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            name='password'
          />
        </div>
        {error && <p>Error: {error.message}</p>}
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        <p>
          Already have an account? <Link to='/login'>login Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
