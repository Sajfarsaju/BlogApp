import React from 'react'
import Navbar from '../components/navbar'
import Login from '../components/login'
import { Toaster } from 'react-hot-toast'





export default function page() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      <Login />
    </>
  )
}