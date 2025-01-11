import React from 'react'

import Navbar from './components/Navbar'

import { Route,Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import HomePage from './pages/HomePage'
export default function App() {
  return (
    <div>
      <Navbar/>

      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/settings" element={<SettingsPage/>}/>

      </Routes>

    </div>
  )
}




