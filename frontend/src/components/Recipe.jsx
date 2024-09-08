import React from 'react'

const Recipe = ({ title, description, onClick, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onClick}
        >
          Update
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Recipe;
