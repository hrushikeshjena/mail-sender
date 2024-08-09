
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import welcomeBackImage from "../../../assets/logo.png"; // Replace with your actual image path

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      setMessage(res.message);
      setLoading(false);
      setError(""); // Clear the error message
      console.log(res.message);
    } catch (error) {
      setLoading(false);

      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      setMessage(""); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-12 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={welcomeBackImage}
              alt="Welcome Back"
              className="w-32 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-600 mb-4">
              Already have an account? Sign in to continue managing your billing tasks.
            </p>
            <Link to="/login">
              <button className="w-full bg-white border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-100">
                Sign In
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded-md">
                  {error}
                </div>
              )}
              {message && (
                <div className="bg-green-100 text-green-700 p-2 rounded-md">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

