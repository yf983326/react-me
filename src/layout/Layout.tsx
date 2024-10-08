import Header from '@/layout/Header.tsx';
import Footer from '@/layout/Footer.tsx';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
