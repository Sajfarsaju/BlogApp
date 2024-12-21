import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const useForm = (initialValues, apiCall) => {
    const [formData, setFormData] = useState(initialValues);
    
    const [backendErrors, setBackendErrors] = useState({}); 
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setBackendErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiCall(formData);

            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;

                // Handle ZOD validation errors
                if (status === 400 && Array.isArray(data.zodValidationErrors)) {
                    const errors = data.zodValidationErrors.reduce((acc, err) => {
                        acc[err.field] = err.message;
                        return acc;
                    }, {});
                    setBackendErrors(errors);
                } else if (status === 401 || status === 403 && data.jwtErrMsg) {
                    
                    if (data.jwtErrMsg === 'Session expired. Please log in again.') {
                        toast.error(data.jwtErrMsg);
                        router.push('/login');
                    }else if (data.jwtErrMsg === 'Access Denied') {
                        toast.error(data.jwtErrMsg);
                        router.push('/login');
                    } else if(status === 403 && data.jwtErrMsg){
                        toast.error(data.jwtErrMsg || 'Unauthorized access');
                    }else if (data.errMsg) {
                        toast.error(data.errMsg);
                    }
                } else if (data.errMsg) {
                    toast.error(data.errMsg);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    };


    return {
        formData,
        setFormData,
        backendErrors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
