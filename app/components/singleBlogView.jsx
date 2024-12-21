import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useBlogContext } from '../context/blogContext';
import { useRouter } from 'next/navigation';
import Axios_Instance from '../api/axios';
import { useReviewContext } from '../context/reviewContext';

export default function SingleBlogView() {

  const { selectedBlog, setSelectedBlog, blogs } = useBlogContext();
  const {
    reviewText,
    setReviewText,
    name,
    setName,
    loading,
    successMessage,
    reviewError,
    setReviewError,
    reviews,
    handleSubmit,
  } = useReviewContext();

  const router = useRouter()
  console.log('reviews;', reviews);

  const handleRecentBlogClick = (post) => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSelectedBlog(post);
  };

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
            Back to blogs
          </a>
        </div>
        <p className="text-center z-10 rounded-full font-medium text-blue-600">
          Published{" "}
          <time dateTime={selectedBlog.createdAt}>
            {new Date(selectedBlog.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </time>

        </p>
        {/* Blog Header */}
        <h1 className="text-3xl mt-5 text-center font-bold text-gray-900 sm:text-4xl">
          {selectedBlog.title}
        </h1>
        <p className="mt-6 text-xl text-center text-gray-900">
          {selectedBlog.subTitle}
        </p>

        {/* Category */}
        <div className="mt-10 text-center text-xs md:text-base">
          <p className="relative z-10 rounded-full font-medium text-blue-600">{selectedBlog.category}</p>
        </div>

        {/* Blog Image */}
        <div className="mt-12">
          <img
            src={`http://localhost:4000${selectedBlog.mainImage}`}
            alt={selectedBlog.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="mx-auto max-w-2xl mt-32 text-lg">
          <p>
            {selectedBlog.baseShortDescription}
          </p>
        </div>

        {/* Sections */}
        <div className="mt-16 mx-auto max-w-2xl text-lg">
          {selectedBlog.sections && selectedBlog.sections.length > 0 && (
            selectedBlog.sections.map((section) => (
              <div key={section._id} className="mb-32">
                <h2 className="text-2xl font-bold text-gray-900">{section.heading}</h2>
                <p className="mt-4 text-lg text-gray-700">{section.description}</p>
                {section.image && (
                  <div className="mt-6">
                    <img
                      src={`http://localhost:4000${section.image}`}
                      alt={section.heading}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Recent Reviews Section */}
        <div className="mx-auto max-w-2xl mt-20 border-b border-gray-200 pb-12">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Reviews</h2>
          <div className="mt-8 space-y-4">
            {reviews?.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border-l-2 border-blue-900 pb-3 pl-5">
                  {/* Review text with word wrap or truncate */}
                  <p className="max-w-2xl text-lg font-medium italic text-gray-800 break-words">"{review.reviewText}"</p>
                  <div className="mt-6 font-light text-base text-gray-600 flex gap-2">
                    <p>{review.name ? review.name : 'Anonymous'}</p>
                    <p>
                      ({new Date(review.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })})
                    </p>
                  </div>
                </div>
              ))

            ) : (
              <p className="text-gray-500 text-md ml-6">No reviews yet</p>
            )}
          </div>
        </div>


        {/* Write a Review Section */}
        <div className="mx-auto max-w-2xl mt-4">
          <h3 className="text-2xl font-semibold text-gray-900">Write a Review</h3>
          <form className="mt-6" onSubmit={handleSubmit}>
            {/* Review Input */}
            <div className="space-y-12">
              <div>
                <label htmlFor="review" className="block text-base font-normal text-gray-700">
                  Review
                </label>
                <textarea
                  id="review"
                  rows="4"
                  className={`mt-2 block w-full rounded-md border ${reviewError ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:outline-none sm:text-sm p-3`}
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => {
                    setReviewText(e.target.value);
                    setReviewError(''); // Clear error on input
                  }}
                />
                {reviewError && <p className="text-red-500 text-sm mt-2">{reviewError}</p>}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button Section */}
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end space-x-4">
              {(reviewText || name) && (
                <button
                  type="button"
                  className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:text-gray-700 border border-gray-300"
                  onClick={() => {
                    setReviewText('');
                    setName('');
                    setReviewError('');
                  }}
                >
                  Reset
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
        {/* End Review */}
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
              <Link href={'/'} className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 w-full sm:w-auto">
                View all posts
              </Link>
            </div>
          </div>

          {/* Blog List */}
          <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-4 sm:mt-4 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs && blogs.filter((post) => post._id !== selectedBlog._id).length > 0 ? (
              blogs
                .filter((post) => post._id !== selectedBlog._id)
                .slice(0, 3)
                .map((post) => (
                  <article key={post._id} className="flex max-w-xl flex-col items-start justify-between">
                    {/* Blog image */}
                    <div className="w-full h-64 bg-gray-200">
                      <img
                        onClick={() => handleRecentBlogClick(post)}
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
                        onClick={() => handleRecentBlogClick(post)}
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
                    <p className="mt-3 text-lg text-gray-600 line-clamp-2">{post.subTitle}</p>

                    {/* Date and Author */}
                    <div className="mt-9 text-base text-gray-600">
                      <p className="font-semibold text-gray-900">{post.authorName}</p>
                      <time dateTime={post.createdAt} className="text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  </article>
                ))
            ) : (
              <p>No recent blogs available.</p>
            )}

          </div>

          {/* Button Section - Will appear below the blog list on mobile */}
          <div className="sm:hidden mt-14 w-full">
            <Link
              href={'/'}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 w-full text-center"
            >
              View all posts
            </Link>
          </div>
        </div>
      </div>
      {/*  */}

    </div>


  )
}