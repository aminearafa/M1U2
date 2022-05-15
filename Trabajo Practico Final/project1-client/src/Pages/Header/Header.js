import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const logout = () => {
    signOut(auth);
  };
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Car World
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/home'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={'/about'}>
              About us
            </Nav.Link>
            <Nav.Link as={Link} to='/services'>
              Services
            </Nav.Link>
            <Nav.Link as={Link} to='/contact'>
              Contact
            </Nav.Link>
            {user ? (
              <button type='button' onClick={logout} className='btn btn-dark'>
                signout
              </button>
            ) : (
              <Nav.Link as={Link} to='/login'>
                <button type='button' className=''>
                  Login
                </button>
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
