import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error: any = useRouteError();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">Oops!</h1>

                <p className="mt-4 text-xl text-gray-700">{error.statusText || error.message}</p>
                <Link to="/" className="mt-6 inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
