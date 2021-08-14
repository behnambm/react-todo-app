import React from 'react'

function Alert({ msg, type, setAlert }) {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ show: false, msg: '', type: '' })
    }, 3000)

    return () => clearTimeout(timeout)
  })

  return <div className={`alert alert-${type}`}>{msg}</div>
}

export default Alert
