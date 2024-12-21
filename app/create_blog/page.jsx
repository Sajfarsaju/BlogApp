"use client";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast'
import { useBlogContext } from "../context/blogContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBlogAPI } from "../api/auth";

export default function CreateBlog() {
    const {
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
        addSection,
        handleInputChange,
        handleSectionImageChange,
        handleMainImageChange,
        errors,
        setErrors,
        authorName,
        setAuthorName,
        setBlogs,
        currentPage
    } = useBlogContext();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitle", subTitle);
        formData.append("category", category);
        formData.append("baseShortDescription", baseShortDescription);
        formData.append("authorName", authorName);

        if (mainImage) formData.append("mainImage", mainImage);

        const sectionsData = sections.map(({ heading, description }) => ({
            heading,
            description,
        }));
        formData.append("sections", JSON.stringify(sectionsData));

        sections.forEach(({ image }) => {
            if (image) formData.append("sectionImages", image);
        });

        try {
            const response = await createBlogAPI(formData);

            if (response.status === 201) {
                const newBlog = response.data.data;
                // setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
                setBlogs((prevBlogs) => {
                    if (currentPage === 1) {
                        return [newBlog, ...prevBlogs.slice(0, 5)];
                    }
                    return prevBlogs;
                });
                router.push("/");
            }
            setTitle('')
            setSubTitle('')
            setCategory('')
            setBaseShortDescription('')
            setMainImage(null)
            setMainImagePreview(null)
            setSections([])
            setAuthorName('')
        } catch (error) {
            const { data, status } = error.response;

            if (status === 400 && Array.isArray(data.errors)) {
                const errorObject = { sections: [] };

                error.response.data.errors.forEach((err) => {
                    const path = err.path;

                    if (path[0] === "sections") {
                        let sectionIndex = 0;

                        if (path.length === 3 && typeof path[1] === "number") {
                            sectionIndex = path[1];
                        }
                        const field = path[path.length - 1];

                        if (!errorObject.sections[sectionIndex]) {
                            errorObject.sections[sectionIndex] = {};
                        }
                        errorObject.sections[sectionIndex][field] = err.message;
                    } else {
                        errorObject[path[0]] = err.message;
                    }
                });

                setErrors(errorObject);
            } else if (status && data.jwtErrMsg) {

                if (data.jwtErrMsg === 'Session expired. Please log in again.') {
                    toast.error(data.jwtErrMsg);
                    router.push('/login');
                } else if ("Session has been expired, Please login") {
                    toast.error("Session has been expired, Please login");
                    router.push('/login');
                } else if (status === 403 && data.jwtErrMsg) {
                    toast.error("Session has been expired, Please login");
                } else if (status === 500 && data.jwtErrMsg) {
                    toast.error('Something went wrong, Please login again');
                    router.push('/login');
                }
            } else {
                console.error("Unexpected error:", error);
                setErrors({ general: "An unexpected error occurred" });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
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
                                // onChange={(e) => {
                                //     setErrors((prevErrors) => ({
                                //         ...prevErrors,
                                //         authorName: "" // Reset the error for this field
                                //     }));

                                //     setAuthorName(e.target.value);
                                // }}
                                onChange={(e) => handleInputChange("authorName", e.target.value)}
                                className={`mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border ${errors?.authorName ? 'border-red-500' : 'border-gray-300'} focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300`}
                                placeholder="Enter author name"

                            />
                            {errors?.authorName && (
                                <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>
                            )}
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
                                // onChange={(e) => {
                                //     setErrors((prevErrors) => ({
                                //         ...prevErrors,
                                //         title: "" // Reset the error for this field
                                //     }));

                                //     setTitle(e.target.value);
                                // }}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                className={`mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border ${errors?.title ? 'border-red-500' : 'border-gray-300'} focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300`}
                                placeholder="Enter blog title"

                            />
                            {errors?.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* subTitle */}
                        <div>
                            <label
                                htmlFor="subTitle"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Sub title related for blog
                            </label>
                            <input
                                id="subTitle"
                                type="text"
                                value={subTitle}
                                // onChange={(e) => {
                                //     setErrors((prevErrors) => ({
                                //         ...prevErrors,
                                //         subTitle: ""
                                //     }));

                                //     setSubTitle(e.target.value);
                                // }}
                                onChange={(e) => handleInputChange("subTitle", e.target.value)}
                                className={`mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border ${errors?.subTitle ? 'border-red-500' : 'border-gray-300'} focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300`}
                                placeholder="Enter a subTitle related to the blog"
                            />
                            {errors?.subTitle && (
                                <p className="text-red-500 text-sm mt-1">{errors.subTitle}</p>
                            )}
                        </div>

                        {/* Base Short Description */}
                        <div>
                            <label
                                htmlFor="baseShortDescription"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Main Description
                            </label>
                            <textarea
                                id="baseShortDescription"
                                rows={3}
                                value={baseShortDescription}
                                // onChange={(e) => {
                                //     setErrors((prevErrors) => ({
                                //         ...prevErrors,
                                //         baseShortDescription: "" // Reset the error for this field
                                //     }));

                                //     setBaseShortDescription(e.target.value);
                                // }}
                                onChange={(e) => handleInputChange("baseShortDescription", e.target.value)}
                                className={`mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border ${errors?.baseShortDescription ? 'border-red-500' : 'border-gray-300'} focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300`}
                                placeholder="Write a base short description for the blog"

                            />
                            {errors?.baseShortDescription && (
                                <p className="text-red-500 text-sm mt-1">{errors.baseShortDescription}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Category related for blog
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => handleInputChange("category", e.target.value)}
                                className={`mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border ${errors?.category ? 'border-red-500' : 'border-gray-300'} focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300`}
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option value="Design">Design</option>
                                <option value="Software Engineering">Software Engineering</option>
                                <option value="Product">Product</option>
                            </select>
                            {errors?.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                            )}
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
                                name="mainImage"
                                accept="image/*"
                                onChange={handleMainImageChange}
                                className={`block w-full px-3 py-2 mt-2 text-sm text-gray-800 border ${errors?.mainImage ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors?.mainImage && (
                                <p className="text-red-500 text-sm mt-1">{errors.mainImage}</p>
                            )}
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
                                    {/* Heading */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Heading
                                        </label>
                                        <input
                                            type="text"
                                            value={section.heading}
                                            onChange={(e) => handleInputChange("heading", e.target.value, index, "sections")}
                                            className={`mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border ${errors?.sections?.[index]?.heading ? "border-red-500" : "border-gray-300"
                                                } focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300`}
                                            placeholder="Enter heading"
                                        />
                                        {errors?.sections?.[index]?.heading && (
                                            <p className="text-red-500 text-sm mt-1">{errors.sections[index].heading}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={section.description}
                                            onChange={(e) => handleInputChange("description", e.target.value, index, "sections")}
                                            className={`mt-2 block w-full rounded-md bg-white px-3 py-3 text-sm text-gray-900 border ${errors?.sections?.[index]?.description ? "border-red-500" : "border-gray-300"
                                                } focus:outline focus:outline-gray-500 focus:ring focus:ring-gray-300`}
                                            placeholder="Enter description"
                                        />
                                        {errors?.sections?.[index]?.description && (
                                            <p className="text-red-500 text-sm mt-1">{errors.sections[index].description}</p>
                                        )}
                                    </div>

                                    {/* Image */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Image (Optional)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleSectionImageChange(index, e);
                                                setErrors((prevErrors) => {
                                                    const updatedErrors = { ...prevErrors };
                                                    if (updatedErrors.sections?.[index]?.image) {
                                                        updatedErrors.sections[index].image = "";
                                                        if (
                                                            !updatedErrors.sections[index].heading &&
                                                            !updatedErrors.sections[index].description
                                                        ) {
                                                            updatedErrors.sections.splice(index, 1);
                                                        }
                                                    }
                                                    return updatedErrors;
                                                });
                                            }}
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
