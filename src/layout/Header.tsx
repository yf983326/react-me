import Logo from '@/layout/Logo.tsx';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-white shadow-md py-4 px-6 md:px-12 flex justify-between items-center">
            {/* Logo 区域 */}
            <Logo />

            {/* 导航菜单 */}
            <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                    首页
                </Link>
                <Link to="/fat-loss-record" className="text-gray-700 hover:text-blue-600">
                    减脂记录
                </Link>
            </nav>

            {/* 用户操作区域 */}
            <div className="flex items-center space-x-4">
                {/* 搜索栏 */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="hidden lg:block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* 用户图标 */}
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 18.364a9 9 0 1113.756 0M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </Link>
            </div>
        </header>
    );
}
