import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const GoogleLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [email, setEmail] = useState('');
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
  console.log('user is', user);
  if (user) {
    console.log('user is', user);
    navigate(from, { replace: true });
  }

  const handlerGoogleLogin = async () => {
    signInWithGoogle();
    // const { data } = await axios.post(
    //   'https://phinventory.herokuapp.com/login',
    //   { email },
    // );

    // localStorage.setItem('accessToken', data.accessToken);
  };
  return (
    <div>
      <Button
        onClick={() => signInWithGoogle()}
        variant='dark'
        className='d-block w-50 m-auto'>
        <img
          src='https://github.com/ProgrammingHero1/genius-car-service-direction-module-62/blob/main/src/images/social/google.png?raw=true'
          width={'20px'}
          alt=''
        />
        Google Login
      </Button>
    </div>
  );
};

export default GoogleLogin;
