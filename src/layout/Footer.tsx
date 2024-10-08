export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">About Yue</h2>
                    <p className="text-center mb-4">We are dedicated to providing the best service possible. Our goal is to satisfy our customers.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-4">
                    <p className="text-sm text-center">&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
