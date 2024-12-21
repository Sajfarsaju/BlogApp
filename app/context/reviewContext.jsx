"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useBlogContext } from './blogContext';
import Axios_Instance from '../api/axios';
import { addReviewApi, fetchReviewsApi } from '../api/auth';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const { selectedBlog, setSelectedBlog } = useBlogContext();

    const [currentBlogId, setCurrentBlogId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem('currentBlogId') || '';
        }
        return '';
    });

    const [reviewText, setReviewText] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [reviewError, setReviewError] = useState('');
    const [reload, setReload] = useState(false);
    const [reviews, setReviews] = useState([]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setReviewError('');
        setSuccessMessage(null);

        try {
            const blogId = selectedBlog?._id ? selectedBlog?._id : currentBlogId
            const response = await addReviewApi(name, reviewText, blogId)

            if (response.status === 201) {
                setReviews(response.data.reviews)
                setReviewText('');
                setName('');
                setReload(true);
                setSuccessMessage('Review submitted successfully!');
            }
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                const { errors } = err.response.data;
                const reviewErrorFromBackend = errors?.find(
                    (error) => error.field === 'reviewText'
                );
                if (reviewErrorFromBackend) {
                    setReviewError(reviewErrorFromBackend.message);
                } else if (err?.response?.data?.message) {
                    console.log(err?.response?.data?.message);

                    setReviewError('Review text is required');
                }
            } else {
                console.error('Review submission error:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch reviews
    const fetchReviews = async () => {
        console.log('working every minute');

        const blogId = selectedBlog?._id || currentBlogId;
        if (!blogId) {
            console.log('Blog ID is missing!');
            return;
        }

        try {

            const response = await fetchReviewsApi(blogId)
            if (response.status === 200) {
                const newReview = response.data.reviews
                console.log(newReview);
                setReviews(newReview)

            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const currentId = localStorage.getItem('currentBlogId');
        setCurrentBlogId(currentId);
        fetchReviews();

    }, [reload, selectedBlog]);


    useEffect(() => {

        setInterval(() => {
            fetchReviews();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    return (
        <ReviewContext.Provider
            value={{
                reviewText,
                setReviewText,
                name,
                setName,
                loading,
                successMessage,
                reviewError,
                setReviewError,
                fetchReviews,
                reviews,
                setReviews,
                handleSubmit,
                setReload,
                selectedBlog,
                setSelectedBlog,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = () => {
    return useContext(ReviewContext);
};
