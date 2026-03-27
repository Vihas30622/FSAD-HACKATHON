import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import SeatSelectionPage from './pages/SeatSelectionPage'
import BookingPage from './pages/BookingPage'
import PaymentPage from './pages/PaymentPage'
import ConfirmationPage from './pages/ConfirmationPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminDashboard'
import { AirlineThemeProvider } from './context/AirlineThemeContext'

function App() {
  return (
    <AirlineThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Landing + search experience */}
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<LandingPage />} />

              {/* Booking flow */}
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/flights/:flightId/seats" element={<SeatSelectionPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />

              {/* User & admin dashboards */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AirlineThemeProvider>
  )
}

export default App
