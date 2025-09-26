import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/member/ProfilePage";
import LoginPage from "./pages/account/LoginPage";
import SignUpPage from "./pages/account/SignUpPage";
import ConfirmSignUpPage from "./pages/account/ConfirmSignUpPage";
import ForgotPasswordPage from "./pages/account/ForgotPasswordPage";
import ReactivatePage from "./pages/account/ReactivatePage";
import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Notification from "./components/Notification";
import ResetPasswordPage from "./pages/account/ResetPasswordPage";
import ChangePasswordPage from "./pages/account/ChangePasswordPage";
import ResetPwdConfirmPage from "./pages/account/ResetPwdConfirmPage";
import SearchPage from "./pages/search/SearchPage";
import ContactsPage from "./pages/contact/contactsPage";
import MessengerPage from "./pages/messenger/MessengerPage";
import EditProfilePage from "./pages/member/EditProfilePage";
import SiteGuide from "./pages/SiteGuide";
import FindContacts from "./components/contact/FindContacts";
import SettingPage from "./pages/setting/SettingPage";
import CompleteSignUpPage from "./pages/account/CompleteSignUpPage";

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
          <Route path="/complete-signup" element={<CompleteSignUpPage />} />
          <Route
            path="/reset-password-confirm"
            element={<ResetPwdConfirmPage />}
          />
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
          <Route path="/search" element={<SearchPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contacts/find-contacts" element={<FindContacts />} />
          <Route
            path="members/edit-profile/:mode"
            element={<EditProfilePage />}
          />
          <Route path="/messenger" element={<MessengerPage />} />
          <Route path="/messages/view-messages" element={<MessengerPage />} />
          <Route path="/site-guide" element={<SiteGuide />} />
          <Route path="/settings/:pstate" element={<SettingPage />} />
          <Route path="/settings/account" element={<SettingPage />} />
        </Route>
      </Routes>
      <Notification /> {/* visible across the app */}
    </>
  );
}
