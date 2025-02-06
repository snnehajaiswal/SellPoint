import React from 'react'
import { Link } from 'react-router-dom'
const HomeScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-100">
    <div className="text-center">
      <h1 className="text-purple-950 font-extrabold text-5xl md:text-6xl drop-shadow-lg">
        SellPoint
      </h1>
      <p className="text-black text-lg mt-4 opacity-80">
        The best place to buy & sell effortlessly.
      </p>
      <Link
        to="/register"
        className="mt-8 inline-block bg-purple-800 hover:bg-purple-900 text-white text-xl font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
      >
        Get Started
      </Link>
    </div>
  </div>
  )
}

export default HomeScreen
