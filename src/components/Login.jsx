import React, { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { verifyUser } = useUser();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const changeHandler = e => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = e => {
    e.preventDefault();

    if (verifyUser(user.email, user.password)) {
      navigate("/");
    }
  };
  return (
    <div className="mt-6 flex items-center justify-center ">
      <div className="bg-white p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign in</h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email Address
            <span className="text-red-500 p-1">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-button"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
              Password <span className="text-red-500 p-1">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-button"
              required
            />
          </div>

          <button type="submit" className="w-full bg-button text-white py-2 rounded-xl hover:bg-white hover:text-button hover:border hover:border-button transition cursor-pointer">
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p
            className="mt-2"
            onClick={() => {
              navigate("/signup");
            }}>
            Don’t have an account? <span className="text-blue-600 cursor-pointer hover:underline">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
