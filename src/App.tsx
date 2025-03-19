
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Sections from './pages/Sections';
import SectionDetails from './pages/SectionDetails';
import Trainers from './pages/Trainers';
import Gallery from './pages/Gallery';
import GalleryAdmin from './pages/admin/GalleryAdmin.tsx';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Content from './pages/admin/Content';
import TrainersManagement from './pages/admin/TrainersManagement';
import ScheduleManagement from './pages/admin/ScheduleManagement';
import Schedule from './pages/Schedule';
import Messages from './pages/admin/Messages';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
export function App() {
  return <AuthProvider>
      <Router>
        <div className="min-h-screen bg-light">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/section/:id" element={<SectionDetails />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute>
                  <Navigate to="/admin/dashboard" replace />
                </ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin">
                  <Users />
                </ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute>
                  <Content />
                </ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute>
                  <GalleryAdmin />
                </ProtectedRoute>} />
            <Route path="/admin/trainers" element={<ProtectedRoute>
                  <TrainersManagement />
                </ProtectedRoute>} />
            <Route path="/admin/schedule" element={<ProtectedRoute>
                  <ScheduleManagement />
                </ProtectedRoute>} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/admin/messages" element={<ProtectedRoute>
                  <Messages />
                </ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>;
}