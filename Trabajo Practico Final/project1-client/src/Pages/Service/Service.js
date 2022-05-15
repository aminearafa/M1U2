import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={service.image} />
        <Card.Body>
          <Card.Title>Name:{service.name}</Card.Title>
          <Card.Title>Price: {service.price}</Card.Title>
          <Card.Text>{service.description}</Card.Text>
          <Link to='/manage'>
            {' '}
            <Button variant='primary'>Manage Item</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;
