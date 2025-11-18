import React from 'react'
import { Route , Routes } from 'react-router-dom'
import UserDashboard from './UserDashboard'
import UploadDocument from './UploadDocument'
import DocumentAuthentic from './DocumentAuthentic'
import VerificationReport from './VerificationReport'
import DocumentForged from './ForgedDocumentAlert'
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Profile from './Profile'
import History from './History';
import ConfidenceResult from './ConfidenceResult';

const User = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="userDashboard" element={<UserDashboard />} />
        <Route path="upload" element={<UploadDocument />} />
        <Route path="authentic" element={<DocumentAuthentic />} />
        <Route path="report" element={<VerificationReport />} />
        <Route path="forged" element={<DocumentForged />} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
        <Route path="confidence" element={<ConfidenceResult />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default User