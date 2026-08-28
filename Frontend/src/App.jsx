import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorDashboard from './pages/donor/DonorDashboard'
import DonationForm from './pages/donor/DonationForm'
import MyDonations from './pages/donor/MyDonations'
import NgoDashboard from './pages/ngo/NgoDashboard'
import AvailableDonations from './pages/ngo/AvailableDonations'
import DonationRequests from './pages/ngo/DonationRequests'
import AdminDashboard from './pages/admin/AdminDashboard'
import NgoRequests from './pages/admin/NgoRequests'
import ManageNgos from './pages/admin/ManageNgos'
import ManageDonors from './pages/admin/ManageDonors'
import ManageDonations from './pages/admin/ManageDonations'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('login')

  const login = (role) => {
    const names = { donor: 'Donor', ngo: 'Green Earth NGO', admin: 'Administrator' }
    setUser({ name: names[role], role })
    setPage(`${role}-dashboard`)
  }

  const logout = () => { setUser(null); setPage('login') }
  const navigate = (nextPage) => setPage(nextPage)

  if (!user && page === 'register') return <Register navigate={navigate} />
  if (!user) return <Login navigate={navigate} onLogin={login} />

  if (user.role === 'donor') {
    if (page === 'donor-donation') return <DonationForm navigate={navigate} />
    if (page === 'donor-history') return <MyDonations navigate={navigate} />
    return <DonorDashboard user={user} navigate={navigate} logout={logout} />
  }

  if (user.role === 'ngo') {
    if (page === 'ngo-available') return <AvailableDonations navigate={navigate} />
    if (page === 'ngo-requests') return <DonationRequests navigate={navigate} />
    return <NgoDashboard user={user} navigate={navigate} logout={logout} />
  }

  if (user.role === 'admin') {
    if (page === 'admin-ngo-requests') return <NgoRequests navigate={navigate} />
    if (page === 'admin-ngos') return <ManageNgos navigate={navigate} />
    if (page === 'admin-donors') return <ManageDonors navigate={navigate} />
    if (page === 'admin-donations') return <ManageDonations navigate={navigate} />
    return <AdminDashboard user={user} navigate={navigate} logout={logout} />
  }
}
