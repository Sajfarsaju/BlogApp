import Axios_Instance from "./axios";

export const signupApi = async (data) => {
  console.log("data on auth:", data);

  return await Axios_Instance.post("/signup", data);
};

export const loginAPI = async (data) => {
  console.log("data on auth:", data);
  return await Axios_Instance.post("/login", data);
};

export const createBlogAPI = async (formData) => {
  return await Axios_Instance.post("/create_blog", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

};

export const fetchBlogApi = async (page = 1) => {
  return await Axios_Instance.get(`/fetchBlogs?page=${page}&limit=6`);
}

export const fetchSingleBlogApi = async (id) => {
  return await Axios_Instance.get(`/fetchSingleBlog/${id}`)
}

export const addReviewApi = async (name,reviewText,blogId) => {
  return await Axios_Instance.post('/addReview', {
    name,
    reviewText,
    blogPostId: blogId,
  });
}

export const fetchReviewsApi = async(blogId) => {
  return await Axios_Instance.get(`/fetchReviews/${blogId}`)
}
