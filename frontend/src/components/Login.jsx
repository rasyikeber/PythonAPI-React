import {useState} from 'react'
import { Link } from 'react-router-dom'
// import {Link} from 'react-router-dom'

const Login = () => {


  const [username, setUsername] =useState('')
  const [password, setPassword] =useState('')
 

  const SubmitForm = ()=>{
    console.log("form submitted")
    console.log(username)
    console.log(password)
  }

  return (
    <>
    <h1 className='mb-4'>Wallcome to The Recipe App</h1>
    <div className="flex  justify-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col h-96 mt-6 items-center max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={SubmitForm}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          <div>
            <small>dont have an account <Link to='/signup' className='bg-green-500 mx-2 text-white p-1 rounded-full'>sign up here</Link></small>
          </div>
        </form>
      </div>
      </div>
    {/* <Link to='/signup' className='bg-green-700 p-2 mx-4 text-white'>Get Started</Link>  */}
    </>
  )
}

export default Login