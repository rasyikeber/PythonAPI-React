import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth,logout } from '../auth'
import Recipe from './Recipe'
import { useForm } from 'react-hook-form'

const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm();
  const [recipeId, setRecipeId] = useState(0);


  useEffect(
    () => {
        fetch('/api/recipe/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data)
            })
            .catch(err => console.log(err))
    }, []
);

const getAllRecipes = () => {
  fetch('/api/recipe/recipes')
    .then(res => res.json())
    .then(data => setRecipes(data))
    .catch(err => console.log(err));
}

const closeModal = () => setShow(false);
  const showModal = (id) => {
    setShow(true);
    setRecipeId(id);
    recipes.map(recipe => {
      if (recipe.id == id) {
        setValue('title', recipe.title);
        setValue('description', recipe.description);
      }
    });
  };



  let token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY')).accessToken;

  const updateRecipe = (data) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };
    console.log("the id ", recipeId)
    fetch(`/api/recipe/recipe/${recipeId}`, requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        window.location.reload(); //refresh
      })
      .catch(err => console.log(err));
  };

  const deleteRecipe = (id) => {
    console.log("the id to be deleted", id)
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    fetch(`/api/recipe/recipe/${id}`, requestOptions)
    .then(res => res.json())
    .then(data => {
      if (res.ok) {
        console.log(data.message);  // Log success message
        alert(data.message);        // Show success message in an alert
        getAllRecipes();            // Refresh the recipe list after deletion
      } else {
        console.error('Error:', data.error);  // Handle error message
      }
    })
    .catch(err => console.log(err));
};


  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Modal */}
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Update Recipe</h2>
              <button className="text-gray-500" onClick={closeModal}>&times;</button>
            </div>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                  {...register('title', { required: true, maxLength: 25 })}
                />
                {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                {errors.title?.type === 'maxLength' && (
                  <p className="text-red-500 text-sm">Title should be less than 25 characters</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  rows={5}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                  {...register('description', { required: true, maxLength: 255 })}
                />
                {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                {errors.description?.type === 'maxLength' && (
                  <p className="text-red-500 text-sm">Description should be less than 255 characters</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={handleSubmit(updateRecipe)}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">List of Recipes</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <Recipe
          title={recipe.title}
          key={recipe.id}  // Use recipe.id as key
          description={recipe.description}
          onClick={() => showModal(recipe.id)}  // Pass recipe.id
          onDelete={() => deleteRecipe(recipe.id)}  // Pass recipe.id
        />
      ))}
      </div>
    </div>
  );
}
const LoggedOutHome = () => {
  return (
      <div className="home container">
          <h1 className='mb-4'>Wallcome to The Recipe App</h1>       
          <Link to='/signup' className='bg-green-700 p-2 mx-4 text-white'>Get Started</Link>
      </div>
  )
}


const Home = () => {
  const [logged] = useAuth()

  return (
    <>
     <div>
        {logged ? <LoggedInHome /> : <LoggedOutHome />}
      </div>
    </>
  )
}

export default Home