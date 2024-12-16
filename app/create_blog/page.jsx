"use client";
import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { createBlogAPI } from "../api/auth";

export default function CreateBlog() {
  // State variables
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [baseShortDescription, setBaseShortDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [sections, setSections] = useState([]);
  const [authorName, setAuthorName] = useState("");

  // Handle main image file input
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setMainImage(file);
      
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1]; // Remove data URL part
        setMainImagePreview(reader.result);
        
        // Now you can send the base64 encoded image to the server
        formData.append("mainImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  

  // Add new blog section
  const addSection = () => {
    setSections([
      ...sections,
      { heading: "", description: "", image: null, imagePreview: null },
    ]);
  };

  // Handle changes to section fields
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  // Handle section image upload
  const handleSectionImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedSections = [...sections];
        updatedSections[index].image = file;
        updatedSections[index].imagePreview = reader.result;
        setSections(updatedSections);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();

    // Create FormData instance
  const formData = new FormData();
  formData.append("title", title);
  formData.append("question", question);
  formData.append("category", category);
  formData.append("baseShortDescription", baseShortDescription);
  formData.append("authorName", authorName);

  // Append main image if available
  if (mainImage) {
    formData.append("mainImage", mainImage);
  }

  // Serialize sections into JSON and append
  const sectionData = sections.map((section) => {
    const { imagePreview, ...cleanSection } = section; // Exclude preview field
    return cleanSection;
  });
  formData.append("sections", JSON.stringify(sectionData));

  // Append section images if available (use unique names for each file)
  sections.forEach((section, index) => {
    if (section.image) {
      formData.append(`sectionImages[${index}]`, section.image); // Use unique keys like sectionImages[0], sectionImages[1] etc.
    }
  });

  // Debug: Log FormData content before sending
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ', pair[1]);
  }

    try {
        // Send API request
        const response = await createBlogAPI(formData);
        console.log("Blog created successfully:", response.data);
    } catch (error) {
        console.error("Error submitting blog:", error);
    }
};



  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center">
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold leading-9 text-gray-900 mb-5">
            Create Blog Post
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Author */}
            <div>
              <label
                htmlFor="authorName"
                className="block text-sm font-medium text-gray-700"
              >
                Author Name
              </label>
              <input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border border-gray-300 focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300"
                placeholder="Enter author name"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border border-gray-300 focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Question */}
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700"
              >
                Related Question
              </label>
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border border-gray-300 focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300"
                placeholder="Enter a question related to the blog"
              />
            </div>

            {/* Base Short Description */}
            <div>
              <label
                htmlFor="baseShortDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Base Short Description
              </label>
              <textarea
                id="baseShortDescription"
                rows={3}
                value={baseShortDescription}
                onChange={(e) => setBaseShortDescription(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border border-gray-300 focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300"
                placeholder="Write a base short description for the blog"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border border-gray-300 focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Design">Design</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Product">Product</option>
              </select>
            </div>

            {/* Main Image */}
            <div>
              <label
                htmlFor="mainImage"
                className="block text-sm font-medium text-gray-700"
              >
                Blog Image
              </label>
              <input
                id="mainImage"
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-800 border border-gray-200"
              />
              {mainImagePreview && (
                <div className="relative h-96 mt-4">
                  <Image
                    src={mainImagePreview}
                    alt="Main Image Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Blog Sections */}
            <div>
              <h2 className="text-lg font-medium text-gray-800">Blog Sections</h2>
              {sections.map((section, index) => (
                <div key={index} className="border rounded-md p-4 mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(e) =>
                        handleSectionChange(index, "heading", e.target.value)
                      }
                      className="mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border border-gray-300 focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300"
                      placeholder="Enter heading"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={5}
                      value={section.description}
                      onChange={(e) =>
                        handleSectionChange(index, "description", e.target.value)
                      }
                      className="mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border border-gray-300 focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300"
                      placeholder="Enter description"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSectionImageChange(index, e)}
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-800 border border-gray-200"
                    />
                    {section.imagePreview && (
                      <div className="relative h-80 mt-4">
                        <Image
                          src={section.imagePreview}
                          alt={`Section ${index + 1} Image Preview`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addSection}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm"
              >
                Add Section
              </button>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
