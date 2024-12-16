import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const useForm = (initialValues, apiCall) => {
    const [formData, setFormData] = useState(initialValues); // Manage form data
    const [backendErrors, setBackendErrors] = useState({}); // Manage backend errors
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear field-specific errors when typing
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
                toast.success(response.data.message || 'Success!');
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;

                // Handle validation errors
                if (status === 400 && Array.isArray(data.zodValidationErrors)) {
                    const errors = data.zodValidationErrors.reduce((acc, err) => {
                        acc[err.field] = err.message;
                        return acc;
                    }, {});
                    setBackendErrors(errors); // Display field-specific errors
                } else if (status === 401 || status === 403 && data.jwtErrMsg) {
                    // Handle token errors (401 Unauthorized, 403 Forbidden)
                    if (data.jwtErrMsg === 'Session expired. Please log in again.') {
                        toast.error(data.jwtErrMsg);  // Show session expired message
                        router.push('/login'); // Redirect to login
                    }else if (data.jwtErrMsg === 'Access Denied') {
                        toast.error(data.jwtErrMsg);  // Access denied (403)
                        router.push('/login'); // Redirect to login (optional, if token issues occur)
                    } else {
                        toast.error(data.jwtErrMsg || 'Unauthorized access'); // Generic fallback message for token issues
                    }
                } else if (data.errMsg) {
                    // Show other backend messages
                    toast.error(data.errMsg);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } else {
                // Handle unexpected errors
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    };


    return {
        formData,
        backendErrors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
