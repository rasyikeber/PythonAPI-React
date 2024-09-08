import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


const CreateRecipe = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [show,setShow]=useState(false);

    const createRecipe = (data) => {
      const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY')).accessToken;
    
      console.log('Retrieved token:', token);
      console.log(JSON.stringify(data));
    
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      };
    
      fetch('/api/recipe/recipes', requestOptions)
        .then(res => res.json())
        .then(responseData => {
          console.log('Backend response:', responseData); // Log the success message from the backend
          reset();  // Reset the form
        })
        .catch(err => console.log(err));
    };
    
    


  return (
    <div className="container mx-auto"> {/* Container with some margin */}
      <h1>Create A Recipe</h1>
      <form className="flex flex-col space-y-2"> {/* Flexbox for form layout */}
        <div className="flex items-center"> {/* Label and input in a row */}
          <label htmlFor="title" className="w-1/4 mr-2 text-sm">Title</label>
          <input
            type="text"
            id="title"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
            {...register('title', { required: true, maxLength: 25 })}
          />
        </div>
        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        {errors.title?.type === 'maxLength' && (
          <p className="text-red-500 text-sm">Title should be less than 25 characters</p>
        )}
        <div className="flex items-center"> {/* Label and textarea in a row */}
          <label htmlFor="description" className="w-1/4 mr-2 text-sm">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
            {...register('description', { required: true, maxLength: 255 })}
          />
        </div>
        {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
        {errors.description?.type === 'maxLength' && (
          <p className="text-red-500 text-sm">Description should be less than 255 characters</p>
        )}
        <button
          type="submit"
          onClick={handleSubmit(createRecipe)}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  )
}
export default CreateRecipe