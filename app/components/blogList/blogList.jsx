import Link from 'next/link'
import React from 'react'
const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]
export default function BlogLists() {

  return (
    <>
  {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
    {/* Blog Header Section */}
    {/* <div className="flex flex-col items-center justify-center text-center mx-auto max-w-2xl">
      <p className="text-blue-700">Our blog</p>
      <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        This is task!
      </h2>
      <p className="mt-4 text-lg/8 text-gray-600">
        Join to learn about new product features, the latest in technologies, solutions, and updates.
      </p>
    </div> */}

    {/* Blog List Header */}
    <h1 className="mt-20 text-2xl font-bold text-gray-900 md:text-center sm:text-xl md:text-3xl">
      All blog posts
    </h1>

    {/* Blog List */}
    <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-4 sm:mt-4 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
          {/* Blog image */}
          <div className="w-full h-64 bg-gray-200">
            <Link href="/blogView">
              <img
                src="https://urbanhubinnovations.com/twitter-image.jpg?b5cf7d79ab221e17"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          {/* Category */}
          <div className="mt-8 text-xs">
            <p className="relative z-10 rounded-full font-medium text-blue-600">
              {post.category.title}
            </p>
          </div>

          {/* Title */}
          <div className="group flex items-center justify-between w-full mt-3">
            <Link href="/blogView">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                {post.title}
              </h3>
            </Link>
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
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">{post.description}</p>

          {/* Date and Author */}
          <div className="mt-9 text-sm text-gray-600">
            <p className="font-semibold text-gray-900">
              <a href={post.author.href}>{post.author.name}</a>
            </p>
            <time dateTime={post.datetime} className="text-gray-500">
              {post.date}
            </time>
          </div>
        </article>
      ))}
    </div>
  </>


  )
}