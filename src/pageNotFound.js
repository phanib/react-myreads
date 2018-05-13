import React from 'react'
import { Link } from 'react-router-dom';

function pageNotFound() {
  return(
    <div>
      <span>  Invalid page </span>
      <Link to='/'> Go to Home </Link>
    </div>
  )
}

export default pageNotFound
