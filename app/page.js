"use client"
import Image from "next/image";
import  Navbar from "./components/navbar";
import BlogListPage from "./components/blogList/blogListPage";
import Pagination from "./components/pagination";
import { useState } from "react";




export default function Home() {
  const [createBlogForm, setCreateBlogForm] = useState(false)
  console.log(createBlogForm);
  
  return (
    <div className="h-[200vh] min-w-min">
      <Navbar/>
      <BlogListPage/>
      {/* <Pagination/> */}
    </div>
  );
}
