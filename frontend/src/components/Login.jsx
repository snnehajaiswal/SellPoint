import React, { useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
   try{
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,formData);
    if(response.status===200){
      toast.success("Login SuccessFully")
      setTimeout(()=>navigate('/home'),1000)
    }
   }catch(error){
    toast.error("Something went wrong please try again")
    console.log(error)
   }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100 p-4">
      <div className="bg-blue-950 p-6 rounded-lg shadow-lg w-full max-w-md">
       <Toaster position="top-right"/>
        <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-white mb-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-white"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-white"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        
        </form>
      </div>
      
    </div>
  );
};

export default Login;
