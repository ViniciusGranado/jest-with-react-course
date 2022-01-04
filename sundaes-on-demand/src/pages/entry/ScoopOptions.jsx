import React from 'react';
import Col from 'react-bootstrap/Col';

export const ScoopOptions = ({ name, imagePath }) => {
  return (
    <Col sx={12} sm={6} md={4} ls={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3000/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
};
