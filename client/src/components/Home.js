import React from 'react';
import { isAuthenticated, logout } from '../fakeAuth';
import { Redirect } from 'react-router-dom';

const Home = ({ history, username, setUsername, startGame }) => {

   const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/game');
  }

  if (isAuthenticated()) {
    return (
      <div className='container'>
        <h1 className='text-center'>Welcome To React Memory Match</h1>
        <div className='text-right'>
          <a className='btn btn-danger' onClick={() => {
            logout()
            history.push('/login')
          }}>Logout</a>
        </div>
        <form onSubmit={handleSubmit} className='container text-center'>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={ (e) => setUsername(e) }
              className="form-control"
              id="username"
              autoFocus
              placeholder="Username"
            />
          </div>
          <button type="submit" className="btn btn-primary">Play!</button>
        </form>
      </div>
    )
  } else {
    return <Redirect to='/login' />
  }
}

export default Home;
