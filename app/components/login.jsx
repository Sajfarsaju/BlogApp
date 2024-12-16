"use client";

import Link from 'next/link'
import Axios_Instance from '../api/axios'
import { loginAPI} from '../api/auth';
import useForm from '../customeHook/useForm';
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';


export default function Login() {
  const { loginAuth } = useAuth();
  const router = useRouter();

  const { formData, backendErrors, handleChange, handleSubmit } = useForm(
    { email: "", password: "" }, 
    loginAPI // Pass login function to useForm
  );

  const onSubmit = async (e) => {
    const responseData = await handleSubmit(e);
    if (responseData) {
      console.log('responseData;',responseData);
      
      const { name, email, token } = responseData;
      loginAuth({ name, email }, token);
      router.push('/');
      toast.success("Login successful!");
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 md:py-32 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h2 className="mt-10 text-3xl/9 font-bold tracking-tight text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-3">Welcome back! Please enter your details</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/7 font-normal text-gray-900">
              Email*
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white px-3 py-3 text-sm/7 text-gray-900 outline outline-1 ${
                  backendErrors?.email ? "outline-red-500" : "outline-gray-300"
                } placeholder:text-gray-500 sm:text-sm/7`}
              />
              {backendErrors?.email && <p className="text-red-500 text-sm mt-1">{backendErrors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/7 font-normal text-gray-900">
              Password*
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                placeholder='Enter your password'
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white px-3 py-3 text-sm/7 text-gray-900 outline outline-1 ${
                  backendErrors?.password ? "outline-red-500" : "outline-gray-300"
                } placeholder:text-gray-500 sm:text-sm/7`}
              />
              {backendErrors?.password && (
                <p className="text-red-500 text-sm mt-1">{backendErrors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-800 ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}