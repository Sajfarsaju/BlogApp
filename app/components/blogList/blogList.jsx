"use client"
import { useBlogContext } from '@/app/context/blogContext';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function BlogLists() {

    const { loading, blogs, setSelectedBlog } = useBlogContext();
    const router = useRouter()

    const handleBlogClick = (post) => {
        setSelectedBlog(post);
        router.push('/blogView');
    };

    return (
        <>
            <h1 className="mt-20 text-2xl font-bold text-gray-900 md:text-center sm:text-xl md:text-3xl">
                All blog posts
            </h1>

            {/* Blog List */}
            <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-4 sm:mt-4 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {blogs.length > 0 ? (
                    blogs.map((post) => (

                        <article key={post._id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="w-full h-64 bg-gray-200">

                                <img
                                    onClick={() => handleBlogClick(post)}
                                    src={`http://localhost:4000${post.mainImage}`}
                                    alt={post.title}
                                    className="w-full h-full object-cover cursor-pointer"
                                />
                            </div>

                            {/* Category */}
                            <div className="mt-8 text-sm">
                                <p className="relative z-10 rounded-full font-medium text-blue-600">
                                    {post.category}
                                </p>
                            </div>

                            {/* Title */}
                            <div className="group flex items-center justify-between w-full mt-3">

                                <h3
                                    onClick={() => handleBlogClick(post)}
                                    className="cursor-pointer text-2xl font-semibold text-gray-900 group-hover:text-gray-600">
                                    {post.title}
                                </h3>
                                <svg
                                    className="h-7 w-6 text-gray-900 ml-2"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="17" y1="7" x2="7" y2="17" />
                                    <polyline points="8 7 17 7 17 16" />
                                </svg>
                            </div>

                            {/* Description */}
                            <p className="mt-3 text-lg font-light text-gray-600 line-clamp-2">{post.subTitle}Node.js is known for its ability to handle a large number of concurrent connections with minimal overhead. It is built around an event-driven architecture that uses asynchronous I/O. This feature makes Node.js a perfect choice for applications that require real-time capabilities such as chat applications, live updates, and collaborative tools. With Node.js, developers can write scalable and high-performance applications, especially for handling many requests simultaneously. Moreover, Node.js has a large ecosystem of libraries and frameworks like Express.js, which simplifies development even further.
                            </p>

                            <div className="mt-9 text-gray-600">
                                <p className="font-semibold text-gray-900 text-base">{post.authorName}</p>
                                <time dateTime={post.createdAt} className="text-sm text-gray-600">
                                    {new Date(post.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                        </article>
                    ))) : (
                    <p className="mt-5 text-center text-gray-600">{loading ? 'Loading...' : "No blogs available."}</p>
                )}
            </div>
        </>
    )
}