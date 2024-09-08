import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [show, setShow] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const SubmitForm = (data) => {
    if (data.password === data.confirmPassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password
      };

      const requestOptions = {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      fetch('/api/auth/signup', requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setServerResponse(data.message);
        setShow(true);
      })
      .catch(err => {
        console.error(err);
        setServerResponse('An error occurred during signup.');
        setShow(true);
      });

      reset();
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <>
    <h1 className='mb-4'>Wallcome to The Recipe App</h1>
    <div className="flex  justify-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col h-96 mt-6 items-center max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form className="mt-8 space-y-6">
          {show && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{serverResponse}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => setShow(false)}
                    >
                      <title>Close</title>
                      <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.64a.5.5 0 10.707.707L10 10.707l3.64 3.64a.5.5 0 00.707-.707L10.707 10l3.641-3.641a.5.5 0 000-.707z" />
                    </svg>
                  </span>
                </div>
              )}
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
              {errors.username && <span className='text-red-800'>username required </span>}
              <br />
              {errors.username?.type==="maxLength"&& <span className='text-red-800'>max length should be less than 25</span>}
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
              {errors.email && <span className='text-red-800'>email is required </span>}
              <br />
              {errors.email?.type==="maxLength" && <span className='text-red-800'>the email char should be less than 80.</span>}
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
              {errors.password && <span className='text-red-800'>password required </span>}
              <br />
              {errors.password?.type==="minLength"&& <span className='text-red-800'>password must be exactly 8 long.</span>}

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
              {errors.confirmPassword && <span className='text-red-800'>confirm Password</span>}
              <br />
              {errors.confirmPassword?.type==="minLength" && <span className='text-red-800'>confirmPassword</span>}


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