// import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'

const SignUp = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const SubmitForm =(data) =>{
    console.log(data)
  }
  console.log(watch("username"));

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
                {...register("username", {required: true, maxLength: 25})}
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {required: true, maxLength: 80})}

                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", {required: true, minLength: 8})}

                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                {...register("confirmPassword", {required: true, minLength: 8})}

                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit(SubmitForm)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          <div>
            <small>have an account?<Link to='/login' className='bg-green-500 mx-2 text-white p-1 rounded-full'>Login here</Link></small>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default SignUp