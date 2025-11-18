import React from 'react'
import { Route , Routes } from 'react-router-dom'
import UserLogin from './Login'
import UserSignup from './Signup'
import AdminLogin from '../admin/Login';
import AdminSignup from '../admin/Signup';

const Authentication= () => {
  return (
    <div>
      <Routes>
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/signup" element={<AdminSignup />} />
      </Routes>
    </div>
  )
}

export default Authentication;