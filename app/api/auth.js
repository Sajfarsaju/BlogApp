import Axios_Instance from "./axios";

export const signupApi = async (data) => {
    console.log("data on auth:",data);
    
    return await Axios_Instance.post("/signup", data);
  };
  
  export const loginAPI = async (data) => {
    console.log("data on auth:",data);
    return await Axios_Instance.post("/login", data);
  };

export const createBlogAPI = async (data) => {
    
    try {
        const response = await Axios_Instance.post("/create_blog", data);
        return response;
    } catch (error) {
        console.log("Error while submitting the blog:", error);
    }
};
