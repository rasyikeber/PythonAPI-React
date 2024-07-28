// import {useState} from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

  return (
    <>
    <h1 className='mb-4'>Wallcome to The Recipe App</h1>       
    <Link to='/signup' className='bg-green-700 p-2 mx-4 text-white'>Get Started</Link> 
    </>
  )
}

export default Home