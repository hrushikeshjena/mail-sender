import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    alert(`${type}: ${message} - ${description}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = isResetMode
        ? `http://localhost:8080/api/reset-password`
        : `http://localhost:8080/api/request-reset`;

      const payload = isResetMode
        ? { token, password }
        : { email };

      const response = await axios.post(url, payload);

      setLoading(false);
      openNotification(
        "success",
        isResetMode ? "Password Reset" : "Reset Request",
        isResetMode
          ? "Password has been reset successfully."
          : "Password reset token has been generated."
      );

      if (!isResetMode) {
        // Store the token in state for the reset mode
        setToken(response.data.token);
      }

      setEmail("");
      setPassword("");
      setIsResetMode(true); // Switch to reset mode
    } catch (error) {
      setLoading(false);
      const message = error.response?.data?.message || "An unexpected error occurred.";
      openNotification("error", "Error", message);
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isResetMode ? "Reset Password" : "Forgot Password"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isResetMode && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
          )}
          {isResetMode && (
            <>
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
            </>
          )}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleBack}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Login
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Submitting..." : isResetMode ? "Reset Password" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
