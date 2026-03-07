import React from 'react'
import { Route , Routes } from 'react-router-dom'
import UserLogin from './Login'
import UserSignup from './Signup'
import AdminLogin from '../admin/Login';
import AdminSignup from '../admin/Signup';
import OrganizationLogin from './OrganizationLogin';
import OrganizationSignup from './OrganizationSignup';

const Authentication= () => {
  return (
    <div>
      <Routes>
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
        <Route path="organization/login" element={<OrganizationLogin />} />
        <Route path="organization/signup" element={<OrganizationSignup />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/signup" element={<AdminSignup />} />
      </Routes>
    </div>
  )
}

export default Authentication;