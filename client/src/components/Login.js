import React from 'react';
import { login } from '../fakeAuth';

const Login = ({ history }) => (
  <div className='container'>
    <h3 className='text-center'>Please Login</h3>
    <div className='text-center'>
      <button className='btn btn-primary' onClick = { () => {
        login();
        history.push('/')
      }}>Login</button>
    </div>
  </div>
)

export default Login;
