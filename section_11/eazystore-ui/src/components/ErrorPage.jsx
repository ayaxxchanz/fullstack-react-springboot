import React from 'react'
import { useRouteError, Link } from 'react-router'
import Header from './Header'
import Footer from './footer/Footer'
import PageTitle from './PageTitle'
import errorImage from '../assets/util/error.png'

export default function ErrorPage() {
    const routeError = useRouteError();
    let errorTitle = "Oops! Something went wrong";
    let errorMessage = "An unexpected error occurred. Please try again later.";
    if (routeError) {
        errorTitle = routeError.status;
        errorMessage = routeError.data;
    }

    return (
        <div className="flex flex-col min-h-[980px]">
        <Header />
        {/* Main Content */}
        <main className="flex-grow">
            <div className="py-12 bg-normalbg dark:bg-darkbg font-primary">
            <div className="max-w-4xl mx-auto px-4">
                <PageTitle title={errorTitle} />
            </div>
            <div className="text-center text-gray-600 dark:text-dark flex flex-col items-center">
                <p className="max-w-[576px] px-2 mx-auto leading-6 mb-4">
                {errorMessage}
                </p>
                <img
                src={errorImage}
                alt="Error"
                className="w-full max-w-[576px] mx-auto mb-6"
                />
                <Link
                to="/home"
                className="py-3 px-6 text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400 text-xl rounded-md transition duration-200 font-semibold"
                >
                Back to Home
                </Link>
            </div>
            </div>
        </main>
        <Footer />
        </div>
    );
}
