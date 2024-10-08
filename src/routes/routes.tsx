import type { RouteObject } from 'react-router-dom';
import Layout from '@/layout/Layout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import FatLossRecord from '@/pages/FatLossRecord.tsx';

export const routes: RouteObject[] = [
    {
        path: '/react-me',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <div>home</div>,
            },
            {
                path: 'fat-loss-record',
                element: <FatLossRecord />,
            },
        ],
    },
];
