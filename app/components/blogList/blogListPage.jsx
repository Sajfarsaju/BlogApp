import React from 'react'
import BlogList from './blogList'
import BlogHeader from './header'
import Pagination from '../pagination'
import { Toaster } from 'react-hot-toast'



export default function BlogListPage() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <BlogHeader />
          <BlogList />
          <Pagination />
        </div>
      </div>
    </>
  )
}