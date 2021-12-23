import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => 
        <div class="text-center mt-5 pt-5" >
            <Spinner animation="border" size="lg" role="status" style={{ color: '#CC0000', width: '5rem', height: '5rem' }}/>
        </div>,
    })}
    {...args}
  />
);

export default ProtectedRoute;