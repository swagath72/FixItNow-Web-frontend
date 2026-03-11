import { RouterProvider, createBrowserRouter } from 'react-router';
import { BookingProvider } from './contexts/BookingContext';
import { AuthProvider } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { ForgotPasswordOTPScreen } from './components/ForgotPasswordOTPScreen';
import { ResetPasswordScreen } from './components/ResetPasswordScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { LocationSelectionScreen } from './components/LocationSelectionScreen';
import { CustomerLocationScreen } from './components/CustomerLocationScreen';
import { CustomerHomeScreen } from './components/CustomerHomeScreen';
import { ServiceSelectionScreen } from './components/ServiceSelectionScreen';
import { BookingDetailsScreen } from './components/BookingDetailsScreen';
import { TechnicianListScreen } from './components/TechnicianListScreen';
import { LiveTrackingScreen } from './components/LiveTrackingScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { RatingReviewScreen } from './components/RatingReviewScreen';
import { TechnicianRegistrationScreen } from './components/TechnicianRegistrationScreen';
import { DocumentUploadScreen } from './components/DocumentUploadScreen';
import { TechnicianDashboardScreen } from './components/TechnicianDashboardScreen';
import { JobRequestScreen } from './components/JobRequestScreen';
import { JobNavigationScreen } from './components/JobNavigationScreen';
import { JobCompletionScreen } from './components/JobCompletionScreen';
import { EarningsScreen } from './components/EarningsScreen';
import { ServiceHistoryScreen } from './components/ServiceHistoryScreen';
import { JobHistoryScreen } from './components/JobHistoryScreen';
import { ChatScreen } from './components/ChatScreen';
import { ChatListScreen } from './components/ChatListScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AddressManagementScreen } from './components/AddressManagementScreen';
import { TechnicianChatList } from './components/TechnicianChatList';
import { PaymentMethodsScreen } from './components/PaymentMethodsScreen';
import { WalletScreen } from './components/WalletScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ReferEarnScreen } from './components/ReferEarnScreen';
import { HelpCenterScreen } from './components/HelpCenterScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { MyReviewsScreen } from './components/MyReviewsScreen';
import { MembershipScreen } from './components/MembershipScreen';
import { TermsScreen } from './components/TermsScreen';
import { AppSettingsScreen } from './components/AppSettingsScreen';
import { PrivacySecurityScreen } from './components/PrivacySecurityScreen';
import { LanguageScreen } from './components/LanguageScreen';

import { ProtectedRoute } from './components/ProtectedRoute';

const router = createBrowserRouter([
  { path: "/", Component: LoginScreen },
  { path: "/login", Component: LoginScreen },
  { path: "/register", Component: RegisterScreen },
  { path: "/forgot-password", Component: ForgotPasswordScreen },
  { path: "/forgot-password-otp", Component: ForgotPasswordOTPScreen },
  { path: "/reset-password", Component: ResetPasswordScreen },

  { path: "/role-selection", element: <ProtectedRoute><RoleSelectionScreen /></ProtectedRoute> },
  { path: "/location-selection", element: <ProtectedRoute><LocationSelectionScreen /></ProtectedRoute> },

  // Customer Routes
  { path: "/customer/location", element: <ProtectedRoute allowedRole="customer"><CustomerLocationScreen /></ProtectedRoute> },
  { path: "/customer/home", element: <ProtectedRoute allowedRole="customer"><CustomerHomeScreen /></ProtectedRoute> },
  { path: "/customer/service/:serviceType", element: <ProtectedRoute allowedRole="customer"><ServiceSelectionScreen /></ProtectedRoute> },
  { path: "/customer/booking", element: <ProtectedRoute allowedRole="customer"><BookingDetailsScreen /></ProtectedRoute> },
  { path: "/customer/technicians", element: <ProtectedRoute allowedRole="customer"><TechnicianListScreen /></ProtectedRoute> },
  { path: "/customer/tracking", element: <ProtectedRoute allowedRole="customer"><LiveTrackingScreen /></ProtectedRoute> },
  { path: "/customer/payment", element: <ProtectedRoute allowedRole="customer"><PaymentScreen /></ProtectedRoute> },
  { path: "/customer/review", element: <ProtectedRoute allowedRole="customer"><RatingReviewScreen /></ProtectedRoute> },
  { path: "/customer/history", element: <ProtectedRoute allowedRole="customer"><ServiceHistoryScreen /></ProtectedRoute> },
  { path: "/customer/chat-list", element: <ProtectedRoute allowedRole="customer"><ChatListScreen role="customer" /></ProtectedRoute> },
  { path: "/customer/chat/:contactId", element: <ProtectedRoute allowedRole="customer"><ChatScreen /></ProtectedRoute> },
  { path: "/customer/profile", element: <ProtectedRoute allowedRole="customer"><ProfileScreen role="customer" /></ProtectedRoute> },
  { path: "/customer/addresses", element: <ProtectedRoute allowedRole="customer"><AddressManagementScreen /></ProtectedRoute> },
  { path: "/customer/payment-methods", element: <ProtectedRoute allowedRole="customer"><PaymentMethodsScreen /></ProtectedRoute> },
  { path: "/customer/wallet", element: <ProtectedRoute allowedRole="customer"><WalletScreen /></ProtectedRoute> },
  { path: "/customer/notifications", element: <ProtectedRoute allowedRole="customer"><NotificationsScreen /></ProtectedRoute> },
  { path: "/customer/rewards", element: <ProtectedRoute allowedRole="customer"><RewardsScreen /></ProtectedRoute> },
  { path: "/customer/refer-earn", element: <ProtectedRoute allowedRole="customer"><ReferEarnScreen /></ProtectedRoute> },
  { path: "/customer/help-center", element: <ProtectedRoute allowedRole="customer"><HelpCenterScreen /></ProtectedRoute> },
  { path: "/customer/favorites", element: <ProtectedRoute allowedRole="customer"><FavoritesScreen /></ProtectedRoute> },
  { path: "/customer/my-reviews", element: <ProtectedRoute allowedRole="customer"><MyReviewsScreen /></ProtectedRoute> },
  { path: "/customer/membership", element: <ProtectedRoute allowedRole="customer"><MembershipScreen /></ProtectedRoute> },
  { path: "/customer/terms", element: <ProtectedRoute allowedRole="customer"><TermsScreen /></ProtectedRoute> },
  { path: "/customer/app-settings", element: <ProtectedRoute allowedRole="customer"><AppSettingsScreen /></ProtectedRoute> },
  { path: "/customer/privacy-security", element: <ProtectedRoute allowedRole="customer"><PrivacySecurityScreen /></ProtectedRoute> },
  { path: "/customer/language", element: <ProtectedRoute allowedRole="customer"><LanguageScreen /></ProtectedRoute> },

  // Technician Routes
  { path: "/technician/register", element: <ProtectedRoute><TechnicianRegistrationScreen /></ProtectedRoute> },
  { path: "/technician/documents", element: <ProtectedRoute><DocumentUploadScreen /></ProtectedRoute> },
  { path: "/technician/dashboard", element: <ProtectedRoute allowedRole="technician"><TechnicianDashboardScreen /></ProtectedRoute> },
  { path: "/technician/job-request/:jobId", element: <ProtectedRoute allowedRole="technician"><JobRequestScreen /></ProtectedRoute> },
  { path: "/technician/job-navigation/:jobId", element: <ProtectedRoute allowedRole="technician"><JobNavigationScreen /></ProtectedRoute> },
  { path: "/technician/job-completion/:jobId", element: <ProtectedRoute allowedRole="technician"><JobCompletionScreen /></ProtectedRoute> },
  { path: "/technician/earnings", element: <ProtectedRoute allowedRole="technician"><EarningsScreen /></ProtectedRoute> },
  { path: "/technician/history", element: <ProtectedRoute allowedRole="technician"><JobHistoryScreen /></ProtectedRoute> },
  { path: "/technician/chat-list", element: <ProtectedRoute allowedRole="technician"><TechnicianChatList /></ProtectedRoute> },
  { path: "/technician/chat/:contactId", element: <ProtectedRoute allowedRole="technician"><ChatScreen /></ProtectedRoute> },
  { path: "/technician/profile", element: <ProtectedRoute allowedRole="technician"><ProfileScreen role="technician" /></ProtectedRoute> },
  { path: "/technician/payment-methods", element: <ProtectedRoute allowedRole="technician"><PaymentMethodsScreen /></ProtectedRoute> },
  { path: "/technician/wallet", element: <ProtectedRoute allowedRole="technician"><WalletScreen /></ProtectedRoute> },
  { path: "/technician/notifications", element: <ProtectedRoute allowedRole="technician"><NotificationsScreen /></ProtectedRoute> },
  { path: "/technician/rewards", element: <ProtectedRoute allowedRole="technician"><RewardsScreen /></ProtectedRoute> },
  { path: "/technician/refer-earn", element: <ProtectedRoute allowedRole="technician"><ReferEarnScreen /></ProtectedRoute> },
  { path: "/technician/help-center", element: <ProtectedRoute allowedRole="technician"><HelpCenterScreen /></ProtectedRoute> },
  { path: "/technician/favorites", element: <ProtectedRoute allowedRole="technician"><FavoritesScreen /></ProtectedRoute> },
  { path: "/technician/my-reviews", element: <ProtectedRoute allowedRole="technician"><MyReviewsScreen /></ProtectedRoute> },
  { path: "/technician/membership", element: <ProtectedRoute allowedRole="technician"><MembershipScreen /></ProtectedRoute> },
  { path: "/technician/terms", element: <ProtectedRoute allowedRole="technician"><TermsScreen /></ProtectedRoute> },
  { path: "/technician/app-settings", element: <ProtectedRoute allowedRole="technician"><AppSettingsScreen /></ProtectedRoute> },
  { path: "/technician/privacy-security", element: <ProtectedRoute allowedRole="technician"><PrivacySecurityScreen /></ProtectedRoute> },
  { path: "/technician/language", element: <ProtectedRoute allowedRole="technician"><LanguageScreen /></ProtectedRoute> },
]);

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <RouterProvider router={router} />
      </BookingProvider>
    </AuthProvider>
  );
}
