import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1>404:Page Not Found</h1>
        <Link to='/'>Back to Home</Link>
    </div>
  )
}

export default NotFoundPage