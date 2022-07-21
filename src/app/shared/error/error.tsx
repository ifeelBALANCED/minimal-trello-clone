import React from 'react';
import { Alert } from 'react-bootstrap';

export const Error = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Something went wrong with your request. Please try again later!</p>
    </Alert>
  );
};
