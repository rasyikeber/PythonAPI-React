import React from 'react';
import {Link} from 'react-router-dom'

import { useForm } from 'react-hook-form';
import { login } from '../auth';  // Import login from auth.js
import { useNavigate } from 'react-router-dom';  // useNavigate replaces useHistory

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();  // useNavigate to redirect

  const loginUser = (data) => {
    console.log(data)
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch('/api/auth/login', requestOptions)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.access_token) {
          // Store the token in localStorage
          localStorage.setItem('REACT_TOKEN_AUTH_KEY', JSON.stringify(data.access_token));
          console.log('Token saved:', responseData.access_token);
        } else {
          console.log('Login failed');
        }
        if (responseData.access_token) {
          // console.log(responseData.access_token)
          login({ accessToken: responseData.access_token, refreshToken: responseData.refresh_token });
          navigate('/');  // Redirect after successful login
        } else {
          alert('Invalid username or password');
        }
      });
  };

  return (
    <>
      <h1 className='mb-4'>Welcome to The Recipe App</h1>
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="w-full flex flex-col h-96 mt-6 items-center max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginUser)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  type="text"
                  {...register('username', { required: true, maxLength: 25 })}
                />
                {errors.username && <p style={{ color: 'red' }}><small>Username is required</small></p>}
                {errors.username?.type === "maxLength" && <p style={{ color: 'red' }}><small>Username should be 25 characters</small></p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  type="password"
                  {...register('password', { required: true, minLength: 8 })}
                />
                {errors.password && <p style={{ color: 'red' }}><small>Password is required</small></p>}
                {errors.password?.type === "minLength" && <p style={{ color: 'red' }}>
                  <small>Password should be more than 8 characters</small>
                </p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
            <div>
              <small>Don't have an account? <Link to='/signup' className='bg-green-500 mx-2 text-white p-1 rounded-full'>Sign up here</Link></small>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default Login;
