
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import signupImage from "../../../assets/logo.png"; // Replace with your actual image path

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.token); // Ensure the token is set correctly
      setMessage("Login successful!");
      setError(""); // Clear the error message
      setTimeout(() => {
        window.location = "/";
      }, 2000); // Redirect after showing the success message
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setMessage(""); // Clear the success message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-12 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
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
                >
                  Sign In
                </button>
              </div>
              <div>
                <Link to="/forget-password">
                  <span className="text-indigo-600 hover:underline">
                    Forgot Password?
                  </span>
                </Link>
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
          <div className="md:w-1/2 md:pl-6">
            <div className="text-center">
              <img
                src={signupImage}
                alt="Sign Up Illustration"
                className="w-32 mx-auto mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">
                New to Our Billing Platform?
              </h4>
              <p className="text-gray-600 mb-4">
                Join us today and start managing your invoices and payments
                effortlessly. Create an account now!
              </p>
              <Link to="/signup">
                <button className="w-full bg-white border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-100">
                  Sign Up Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

