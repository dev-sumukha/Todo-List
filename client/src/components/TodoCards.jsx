import React from 'react'

function TodoCards({ props,handleDelete }) {
  const { _id } = props;

  return (
    <>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">{props.title}</h2>
          <input
            type="checkbox"
            className="h-5 w-5 text-green-500 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <p className="text-gray-400 mb-4">{props.description}</p>
        <p className="text-gray-400">
          <strong>Scheduled:</strong> {props.sendAt}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={()=>handleDelete(_id)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>

    </>
  )
}

export default TodoCards