'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {

	const auth = useAuth();
	
	const router = useRouter();
    const { login } = useAuth();
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

	const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

    const handleSubmit = async (event) => {
        event.preventDefault();
		setErrors({
			email: '',
			password: '',
		});
        try {
            await login(formData);
			router.push('/chat');
        } catch (error) {
            const { errors } = JSON.parse(error.message);
            setErrors(errors);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-1/2">
                <section className="dark:bg-gray-900 w-full">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                        <a
                            hreg="#"
                            className="flex items-center mb-6 text-3xl font-semibold text-gray-900 text-white"
                        >
                            Bem-vindo ao zap-js
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Acesse sua conta
                                </h1>
                                <form
                                    className="space-y-4 md:space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                                errors.email
                                                    ? 'border-red-500 outline-red-500'
                                                    : ''
                                            }`}
                                            placeholder="nome@empresa.com"
                                            required={true}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {' '}
                                                {errors.email}{' '}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                                    errors.password
                                                        ? 'border-red-500 outline-red-500'
                                                        : ''
                                                }`}
                                                required={true}
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
                                                <button
                                                    type="button"
                                                    onClick={
                                                        togglePasswordVisibility
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#6b5a5a"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-eye"
                                                    >
                                                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="3"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {' '}
                                                {errors.password}{' '}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="remember"
                                                    aria-describedby="remember"
                                                    type="checkbox"
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                    required=""
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label
                                                    htmlFor="remember"
                                                    className="text-gray-500 dark:text-gray-300"
                                                >
                                                    Lembrar senha
                                                </label>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Esqueceu sua senha?
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Entrar
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Não tem uma conta ainda?
                                        <Link
                                            href="/signup"
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                                        >
                                            Cadastrar
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
