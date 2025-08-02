import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    billingAddress: "",
    emailAddress: "",
  });

  const submitHandler = e => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(form));
    navigate("/checkout/payment");
  };

  const onChangeHandler = e => {
    setForm(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setForm(prev => ({
        ...prev,
        emailAddress: parsedData.emailAddress || "",
        billingAddress: parsedData.billingAddress || "",
        firstName: parsedData.firstName || "",
        lastName: parsedData.lastName || "",
      }));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <BreadCrumb />
      <div className="bg-white text-center rounded-lg  max-w-md mx-auto ">
        <div className="bg-white p-3 rounded-md  text-lg  max-w-md mx-auto ">
          <p>
            <span className="font-medium text-red-800">Fill details →</span>
            <span className="font-medium text-red-800 ml-2">Select payment →</span>
            <span className="font-medium text-red-800 ml-2">Pay</span>
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <form onSubmit={submitHandler} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="John"
            value={form.firstName}
            onChange={onChangeHandler}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Doe"
            value={form.lastName}
            onChange={onChangeHandler}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">
            Billing Address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="billingAddress"
            id="billingAddress"
            required
            placeholder="1234 Main St"
            value={form.billingAddress}
            onChange={onChangeHandler}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            placeholder="you@example.com"
            value={form.emailAddress}
            onChange={onChangeHandler}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button type="submit" className="w-full bg-button text-white py-2 px-4 rounded-md hover:bg-white hover:text-button hover:border hover:border-button transition cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Checkout;
