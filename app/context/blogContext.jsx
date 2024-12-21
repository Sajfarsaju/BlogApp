"use client"
import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchBlogApi, fetchSingleBlogApi } from "../api/auth";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    // For creating blog
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("");
    const [baseShortDescription, setBaseShortDescription] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [sections, setSections] = useState([]);
    const [authorName, setAuthorName] = useState("");

    // For listing blogs with Pagingation
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    console.log("Blogs from context:", blogs);
    const [errors, setErrors] = useState(null);

    const [loading, setLoading] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    
    // For pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling to the top
          });
        fetchBlogs(page); 
      };

    // Fetching Blogs
    const fetchBlogs = async (page) => {
        setLoading(true)
        try {
            const response = await fetchBlogApi(page);
            if (response.status === 200) {
                const { blogs, currentPage, totalPages } = response.data;
                setBlogs(blogs);
                setCurrentPage(currentPage);
                setTotalPages(totalPages);
                setLoading(false)
            }
        } catch (err) {
            setErrors(err);
            setLoading(false)
            console.error("Error fetching blogs:", err);
        }
    };
    useEffect(() => {
        fetchBlogs();
    }, [selectedBlog]);


    // ***************
    useEffect(() => {
        const currentBlogId = localStorage.getItem('currentBlogId');
        if (currentBlogId) {
            const savedBlog = localStorage.getItem(`blog-${currentBlogId}`);
            if (savedBlog) {
                setSelectedBlog(JSON.parse(savedBlog)); // Set selected blog from localStorage
            }
        }
    }, [setSelectedBlog]);

    useEffect(() => {
        const loadBlog = async () => {
            setLoading(true);

            if (selectedBlog?._id) {
                let blog;

                const savedBlog = localStorage.getItem(`blog-${selectedBlog?._id}`);
                if (savedBlog) {
                    blog = JSON.parse(savedBlog);
                }

                if (!blog) {
                    try {
                        const res = await fetchSingleBlogApi(selectedBlog?._id);
                        const data = res.data.blog;
                        setSelectedBlog(data); 

                        localStorage.setItem(`blog-${selectedBlog?._id}`, JSON.stringify(data));
                        localStorage.setItem('currentBlogId', selectedBlog?._id); // Store the current blog ID for reference
                    } catch (err) {
                        console.error('Failed to fetch blog:', err);
                    }
                }
            }

            setLoading(false);
        };

        // 6. Only fetch the blog if there is a valid selectedBlog ID (ensuring the blog context is set)
        if (selectedBlog?._id) {
            loadBlog();
        }
    }, [selectedBlog]);

    useEffect(() => {
        if (selectedBlog?._id) {
            localStorage.setItem(`blog-${selectedBlog?._id}`, JSON.stringify(selectedBlog))
            localStorage.setItem('currentBlogId', selectedBlog?._id);
        }
    }, [selectedBlog]);
    // ***************

    const addSection = () => {
        setSections([
            ...sections,
            { heading: "", description: "", image: null, imagePreview: null },
        ]);
    };

    const handleInputChange = (field, value, index = null, type = null) => {
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };

            if (type === "sections" && index !== null) {
                // Clear specific field error in the section
                if (updatedErrors.sections?.[index]?.[field]) {
                    updatedErrors.sections[index][field] = "";

                    // Remove the section from errors if no errors remain
                    if (
                        !updatedErrors.sections[index].heading &&
                        !updatedErrors.sections[index].description &&
                        !updatedErrors.sections[index].image
                    ) {
                        updatedErrors.sections.splice(index, 1);
                    }
                }
            } else {
                // Clear error for other fields
                if (updatedErrors[field]) {
                    updatedErrors[field] = "";
                }
            }

            return updatedErrors;
        });

        if (type === "sections" && index !== null) {
            setSections((prevSections) =>
                prevSections.map((section, i) =>
                    i === index ? { ...section, [field]: value } : section
                )
            );
        } else {
            switch (field) {
                case "title":
                    setTitle(value);
                    break;
                case "subTitle":
                    setSubTitle(value);
                    break;
                case "category":
                    setCategory(value);
                    break;
                case "baseShortDescription":
                    setBaseShortDescription(value);
                    break;
                case "authorName":
                    setAuthorName(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setMainImage(file);
            // Clear the error for mainImage
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors.mainImage;
                return updatedErrors;
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                mainImage: "Please select a valid image file.",
            }));
        }
    };

    const handleSectionImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedSections = [...sections];
                updatedSections[index].image = file; // Save the file
                updatedSections[index].imagePreview = reader.result; // Save the preview URL
                setSections(updatedSections); // Update state with new sections
            };
            reader.readAsDataURL(file); // Generate base64 preview
        }
    };


    return (
        <BlogContext.Provider
            value={{
                // Blog creation state
                title,
                setTitle,
                subTitle,
                setSubTitle,
                category,
                setCategory,
                baseShortDescription,
                setBaseShortDescription,
                mainImage,
                setMainImage,
                mainImagePreview,
                setMainImagePreview,
                sections,
                setSections,
                authorName,
                setAuthorName,
                addSection,
                handleInputChange,
                // handleSectionChange,
                handleSectionImageChange,
                handleMainImageChange,
                // Blog listing state
                fetchBlogs,
                blogs,
                setBlogs,
                errors,
                setErrors,
                // Selected blog for detailed view
                selectedBlog,
                setSelectedBlog,
                // fetchBlogById,
                loading,
                setLoading,
                handlePageChange,
                currentPage,
                setCurrentPage,
                totalPages,
                setTotalPages
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogContext = () => useContext(BlogContext);
