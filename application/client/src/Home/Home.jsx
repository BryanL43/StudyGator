import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Link to="/about" className="text-pink-400">About Page</Link>
    )
}

export default Home