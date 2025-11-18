import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './pages/User'
import Admin from './admin/Admin';
import LandingPage from './pages/LandingPage'
import Authentication from './pages/Authentication';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/*" element={<User />} />
            <Route path="/auth/*" element={<Authentication />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;