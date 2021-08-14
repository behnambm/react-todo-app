import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

function List({ list, removeItem, editItem }) {
  return (
    <div className='todo-list'>
      {list.map((item) => (
        <article className='todo-item' key={item.id}>
          <p> {item.title}</p>
          <div className='btn-container'>
            <button
              className='btn-icon btn-edit'
              onClick={() => editItem(item.id)}
            >
              <FaEdit />
            </button>
            <button
              className='btn-icon btn-delete'
              onClick={() => removeItem(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default List
