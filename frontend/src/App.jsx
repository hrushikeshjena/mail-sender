import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashborad.jsx";
// import SMTP from "./components/SMTP";

import Signup from "./pages/authenticationSystem/singup/index.jsx";
import Login from "./pages/authenticationSystem/login/index.jsx";
import EmailVerify from "./pages/authenticationSystem/emailVerify/index.jsx";
import ForgetPassword from "./pages/authenticationSystem/forgetPassWord/index";
import ResetPassword from "./pages/authenticationSystem/passwordReset/index.jsx";
const EmailForm = () => {
  const user = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Navigate replace to="/login" />} />
          )}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<ResetPassword />}
          />
          {/* <Route path="/" element={<Dashboard />} /> */}
          {/* <Route path="/" element={<SMTP />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default EmailForm;
