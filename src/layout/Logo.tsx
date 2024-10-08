import { Link } from 'react-router-dom';

export default function Logo({ className }: { className?: string }) {
    return (
        <Link to="/" className={`flex items-center space-x-2 ${className}`}>
            {/* 图标 */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" fill="#fff" />
            </svg>

            {/* 名称 */}
            <span className="text-xl font-bold text-gray-800">Yue</span>
        </Link>
    );
}
