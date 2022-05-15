import axios from 'axios';
import React, { useRef } from 'react';
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import auth from '../../firebase.init';

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, passReseterror] =
    useSendPasswordResetEmail(auth);
  const emailtRef = useRef('');
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

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };

    signInWithEmailAndPassword(email, password);
    // const { data } = await axios.post(
    //   'https://phinventory.herokuapp.com/login',
    //   { email },
    // );
    // localStorage.setItem('accessToken', data.accessToken);
    // console.log(data);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const email = emailtRef.current.value;

    const confirm = window.confirm('Want to reset your password?');
    if (!confirm) {
      return;
    }
    await sendPasswordResetEmail(email);
    toast('Sent email');
  };

  return (
    <div>
      <div>
        <h1 className='text-center'>Login here</h1>
        <form onSubmit={handlerSubmit} className='m-auto w-50'>
          <div className='mb-3'>
            <label className='form-label'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='email'
              ref={emailtRef}
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
          <button
            className='d-block btn btn-dark'
            onClick={handleResetPassword}>
            Forget Password?
          </button>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
          <p>
            Already have an account? <Link to='/signup'>Signup Here</Link>
          </p>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
