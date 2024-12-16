import Link from 'next/link';
import React from 'react'
const post = {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
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
}
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

const reviews = [
    {
        text: "This blog provided me with so many actionable tips. I loved the writing style!",
        name: "Emily Johnson",
        date: "December 10, 2024",
    },
    {
        text: "A fantastic read! This blog clarified a lot of doubts I had about presentations.",
        name: "Michael Smith",
        date: "December 8, 2024",
    },
    {
        text: "Insightful and well-written. Looking forward to more blogs like this!",
        name: "Samantha Lee",
        date: "December 5, 2024",
    },
];


export default function SingleBlogView() {
    return (
        <div className="bg-white py-12 sm:py-20 mt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 border-b border-gray-200 pb-24">
                {/* Back Button */}
                <div className="mb-6">
                    <a href="/" className="text-blue-600 hover:underline flex items-center">
                        <svg
                            className="h-5 w-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to blog
                    </a>
                </div>
                <p className="text-center z-10 rounded-full font-medium text-blue-600">
                    Published {post.date}
                </p>
                {/* Blog Header */}
                <h1 className="text-3xl mt-5 text-center font-bold text-gray-900 sm:text-4xl">
                    {post.title}
                </h1>
                <p className="mt-6 text-xl text-center text-gray-900">
                    How do you create compelling presentations that wow your colleagues and impress your managers?
                </p>

                {/* Category */}
                <div className="mt-10 text-center text-xs md:text-base">
                    <p className="relative z-10 rounded-full font-medium text-blue-600">{post.category.title}</p>
                </div>

                {/* Blog Image */}
                <div className="mt-12">
                    <img
                        src="https://urbanhubinnovations.com/twitter-image.jpg?b5cf7d79ab221e17"
                        alt={post.title}
                        className="w-full h-auto rounded-lg object-cover"
                    />
                </div>

                {/* Blog Content */}
                <div className="mx-auto max-w-2xl mt-32 text-lg">
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a
                        page when looking at its layout. The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many desktop publishing packages and web page
                        editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
                        uncover many web sites still in their infancy. Various versions have evolved over the years,
                        sometimes by accident, sometimes on purpose (injected humour and the like).
                    </p>
                </div>

                {/* Recent Reviews Section */}
                <div className="mx-auto max-w-2xl mt-20 border-b border-gray-200 pb-12">
                    <h2 className="text-2xl font-semibold text-gray-900">Recent Reviews</h2>
                    <div className="mt-8 space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-l-2 border-blue-900 pb-6 pl-5">
                                <p className="text-lg font-medium text-gray-800">"{review.text}"</p>
                                <div className="mt-2 font-light text-sm text-gray-600 flex gap-2">
                                    <p>{review.name}</p>
                                    <p>({review.date})</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Write a Review Section */}
                <div className="mx-auto max-w-2xl mt-4">
  <h3 className="text-2xl font-semibold text-gray-900">Write a Review</h3>
  <form className="mt-6">
    {/* Review Input */}
    <div className="space-y-12"> {/* Space only between review and name */}
      <div>
        <label htmlFor="review" className="block text-base font-normal text-gray-700">
          Review
        </label>
        <textarea
          id="review"
          rows="4"
          className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none sm:text-sm p-3"
          placeholder="Write your review here..."
        />
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-base font-normal text-gray-700">
          Name (Optional)
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none sm:text-sm p-3"
          placeholder="Enter your name"
        />
      </div>
    </div>

    {/* Submit Button Section */}
    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end space-x-4">
      <button
        type="reset"
        className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:text-gray-700 border border-gray-300"
      >
        Reset
      </button>
      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  </form>
</div>
</div>

<div className="py-20 sm:py-20 px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    {/* Blog Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-blue-700">Our blog</p>
        <h2 className="mt-4 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Latest blog posts
        </h2>
        <p className="mt-4 text-lg/8 text-gray-600">
          Join to learn about new product features, the latest in technologies, solutions, and updates.
        </p>
      </div>

      {/* Button Section - Will be shown only on larger screens (sm: and above) */}
      <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:justify-end sm:w-auto w-full hidden">
        <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 w-full sm:w-auto">
          View all posts
        </button>
      </div>
    </div>

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

    {/* Button Section - Will appear below the blog list on mobile */}
    <div className="sm:hidden mt-8">
      <button className="items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 w-full">
        View all posts
      </button>
    </div>
  </div>
</div>







           
        </div>


    )
}