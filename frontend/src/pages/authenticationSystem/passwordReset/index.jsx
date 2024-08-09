import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPasswordCard = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    alert(`${type}: ${message} - ${description}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8080/api/reset-password`, { token, password });

      setLoading(false);
      openNotification("success", "Password Reset", "Password has been reset successfully.");
      navigate('/login');
    } catch (error) {
      setLoading(false);
      const message = error.response?.data?.message || "An unexpected error occurred.";
      openNotification("error", "Error", message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700">
              Token
            </label>
            <input
              id="token"
              name="token"
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Token"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="New Password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordCard;
