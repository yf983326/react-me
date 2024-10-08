import type { RouteObject } from 'react-router-dom';
import Layout from '@/layout/Layout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import FatLossRecord from '@/pages/FatLossRecord.tsx';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'fat-loss-record',
                element: <FatLossRecord />,
            },
        ],
    },
];
