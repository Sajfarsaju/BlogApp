import Image from "next/image";
import Link from "next/link";
import  Navbar from "./components/navbar";
import BlogLists from "./components/blogLists";





export default function Home() {
  return (
    <div className="h-[200vh] min-w-min">
      <Navbar/>
     
      <BlogLists/>
    </div>
  );
}
