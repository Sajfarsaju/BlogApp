"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useForm from "../customeHook/useForm";
import { signupApi } from "../api/auth";
import { useAuth } from '../context/authContext';

export default function Signup() {
  const router = useRouter();
  const { loginAuth } = useAuth();
  
  const { formData, setFormData, backendErrors, handleChange, handleSubmit } = useForm(
    { name: "", email: "", password: "" }, 
    signupApi
  );

  const onSubmit = async (e) => {
    const responseData = await handleSubmit(e);
    if (responseData) {
      const { name, email, token } = responseData;
      loginAuth({ name, email }, token);
      router.push('/');
      setFormData({ name: "", email: "", password: "" })
      toast.success("Welcome");
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 md:py-32 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 sm:text-center text-3xl/9 font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm/7 font-normal text-gray-900">
              Name*
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Enter your name"
                className={`block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 ${backendErrors?.name ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-500 sm:text-sm/6`}
              />
              {backendErrors?.name && <p className="text-red-500 text-sm mt-1">{backendErrors.name}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm/7 font-normal text-gray-900">
              Email*
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
                className={`block w-full rounded-md bg-white px-3 py-3 text-sm/7 text-gray-900 outline outline-1 -outline-offset-1 ${backendErrors?.email ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-500 sm:text-sm/7`}
              />
              {backendErrors?.email && <p className="text-red-500 text-sm mt-1">{backendErrors.email}</p>}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm/6 font-normal text-gray-900">
              Password*
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                onChange={handleChange}
                value={formData.password}
                className={`block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 ${backendErrors?.password ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-500 sm:text-sm/6`}
              />
              {backendErrors?.password ? <p className="text-red-500 text-sm mt-1">{backendErrors.password}</p> : <p className="text-gray-600 text-sm mt-2">Must be at least 8 characters.</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blueColor px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-blueColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create account
            </button>
          </div>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{' '}
          <Link href={'/login'} className="text-blueColor ml-1">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}