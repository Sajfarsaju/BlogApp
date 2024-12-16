import React from 'react'

export default function Pagination() {
  return (
    <nav className="flex items-center justify-center gap-x-2 mt-4" aria-label="Pagination">
  {/* Previous Button */}
  <button
    type="button"
    className="min-h-[38px] min-w-[38px] flex items-center gap-x-1 justify-center rounded-lg text-gray-800 hover:bg-gray-100 dark:text-gray-800 focus:outline-none disabled:cursor-not-allowed"
    aria-label="Previous"
    disabled
  >
    <svg
      className="text-gray-800"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18L9 12l6-6"></path>
    </svg>
    <span className="text-gray-800">Previous</span>
  </button>

  {/* Page Numbers */}
  {[1, 2, 3, 4, 5].map((page) => (
    <button
      key={page}
      type="button"
      className="min-h-[38px] min-w-[38px] flex items-center justify-center text-base rounded-lg focus:outline-none hover:bg-gray-100 text-gray-800"
      aria-current={page === 1 ? "page" : undefined}
    >
      {page}
    </button>
  ))}

  {/* Ellipsis */}
  <button
    type="button"
    className="min-h-[38px] min-w-[38px] flex items-center justify-center text-base text-gray-800 hover:bg-gray-100 dark:text-gray-800 rounded-lg focus:outline-none"
    aria-label="More pages"
  >
    ...
  </button>

  {/* Last Page */}
  <button
    type="button"
    className="min-h-[38px] min-w-[38px] flex items-center justify-center text-base text-gray-800 hover:bg-gray-100 dark:text-gray-800 rounded-lg focus:outline-none"
  >
    10
  </button>

  {/* Next Button */}
  <button
    type="button"
    className="min-h-[38px] min-w-[38px] flex items-center gap-x-1 justify-center rounded-lg text-gray-800 hover:bg-gray-100 dark:text-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    aria-label="Next"
  >
    <span className="text-gray-800">Next</span>
    <svg
      className="text-gray-800"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6"></path>
    </svg>
  </button>
</nav>
  
  )
}