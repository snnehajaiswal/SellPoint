import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: {
      firstname: "",
      lastname: "",
    },
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "firstname" || name === "lastname") {
        return {
          ...prevData,
          fullName: {
            ...prevData.fullName,
            [name]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        formData
      );
      if (response.status === 201) {
        toast.success("Successfully Registered!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100 p-4">
      <div className="bg-blue-950 p-5 rounded-lg shadow-xl w-full max-w-md">
        <Toaster position="top-right" />
        <h2 className="text-3xl font-semibold text-white  mb-2">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstname" className="block text-white mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.fullName.firstname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-lg bg-white text-gray-900"
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastname" className="block text-white mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.fullName.lastname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-lg bg-white text-gray-900"
              placeholder="Enter last name"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="block text-white mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-lg bg-white text-gray-900"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-lg bg-white text-gray-900"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-lg bg-white text-gray-900"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300 font-semibold"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
