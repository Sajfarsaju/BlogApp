import React from 'react'
import Navbar from '../components/navbar'
import Signup from '../components/signup'
import { Toaster } from 'react-hot-toast'


export default function page() {
  return (
    <>
    <Toaster
        position="top-center"
        reverseOrder={false}
      />
    <Navbar/>
    <Signup/>
  </>
  )
}