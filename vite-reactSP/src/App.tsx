// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ProfilePage from './routes/ProfilePage';
import EditProfilePage from './routes/EditProfilePage';
import LoginPage from './pages/account/LoginPage';
import SignUpPage from './pages/account/SignUpPage';
import ConfirmSignUpPage from './pages/account/ConfirmSignUpPage';
import ForgotPasswordPage from './pages/account/ForgotPasswordPage';
import ReactivatePage from './pages/account/ReactivatePage';
import ProtectedRoute from './routes/ProtectedRoute';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Notification from './components/Notification';
import ResetPasswordPage from './pages/account/ResetPasswordPage';
import ChangePasswordPage from './pages/account/ChangePasswordPage';
import ResetPwdConfirmPage from './pages/account/ResetPwdConfirmPage';

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirm-signup" element={<ConfirmSignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/reset-password-confirm" element={<ResetPwdConfirmPage />} />
          <Route path="/reactivate" element={<ReactivatePage />} />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Route>
      </Routes>

      <Notification /> {/* visible across the app */}
    </>
  );
}
