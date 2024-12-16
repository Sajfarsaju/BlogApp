"use client";

import React, { createContext, useState, useContext } from "react";

// Create the BlogContext
const BlogContext = createContext();

// BlogProvider component to manage blog state
export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    question: "",
    category: "",
    baseShortDescription: "",
    mainImage: null,
    sections: [],
    authorName: "",
  });

  // Update the blog data dynamically
  const updateBlogData = (field, value) => {
    setBlogData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add a new section
  const addSection = () => {
    setBlogData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { heading: "", description: "", image: null, imagePreview: null },
      ],
    }));
  };

  // Update a specific section
  const updateSection = (index, field, value) => {
    const updatedSections = [...blogData.sections];
    updatedSections[index][field] = value;
    setBlogData((prev) => ({ ...prev, sections: updatedSections }));
  };

  return (
    <BlogContext.Provider
      value={{
        blogData,
        updateBlogData,
        addSection,
        updateSection,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to access the blog context
export const useBlog = () => {
  return useContext(BlogContext);
};
