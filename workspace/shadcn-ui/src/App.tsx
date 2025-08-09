import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import { AuthenticatedRoute } from './components/auth/authenticated-route';
import { MainLayout } from './components/layout/main-layout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';

// Main App Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Connections from './pages/Connections';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <AuthenticatedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </AuthenticatedRoute>
            } />
            <Route path="/explore" element={
              <AuthenticatedRoute>
                <MainLayout>
                  <Explore />
                </MainLayout>
              </AuthenticatedRoute>
            } />
            <Route path="/profile/:userId" element={
              <AuthenticatedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </AuthenticatedRoute>
            } />
            <Route path="/connections" element={
              <AuthenticatedRoute>
                <MainLayout>
                  <Connections />
                </MainLayout>
              </AuthenticatedRoute>
            } />
            <Route path="/messages" element={
              <AuthenticatedRoute>
                <MainLayout>
                  <Messages />
                </MainLayout>
              </AuthenticatedRoute>
            } />
            <Route path="/notifications" element={
              <AuthenticatedRoute>
                <MainLayout>
                  <Notifications />
                </MainLayout>
              </AuthenticatedRoute>
            } />
            
            {/* Redirect to login if trying to access index page without auth */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
