"use client"
import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import Signup from '../components/signup'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation';


export default function page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      <Signup />
    </>
  )
}