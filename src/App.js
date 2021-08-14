import { useState, useEffect } from 'react'
import Alert from './components/Alert'
import List from './components/List'

const getLocalStorage = () => {
  const list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(list)
  }
  return []
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      setAlert({ show: true, msg: 'please enter value', type: 'danger' })
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setIsEditing(false)
      setEditID(null)
      setName('')
      setAlert({ show: true, msg: 'an item has been updated', type: 'success' })
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
      setAlert({ show: true, msg: 'new item added', type: 'success' })
    }
  }

  const clearList = () => {
    setAlert({ show: true, msg: 'empty list', type: 'danger' })
    setIsEditing(false)
    setName('')
    setEditID(null)
    setList([])
  }

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id))
    setAlert({ show: true, msg: 'an item has been removed', type: 'danger' })
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className='section-center'>
      <h3>todo list</h3>

      {alert.show && <Alert {...alert} setAlert={setAlert} />}

      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='e.g. finish homework'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
      </form>

      {list.length > 0 ? (
        <>
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear all
          </button>
        </>
      ) : null}
    </section>
  )
}

export default App
