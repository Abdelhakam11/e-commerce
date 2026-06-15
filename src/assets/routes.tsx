import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout/Layout.component';

const Home = lazy(() => import('../pages/Home/Home.component'));
const Shop = lazy(() => import('../pages/Shop/Shop.component'));
const ProductDetails = lazy(() => import('../pages/ProductDetials/ProductDetials.component'));
const ShopAllProducts = lazy(() => import('../components/ShopAllProducts/ShopAllProducts.component'));
const ShopByCategories = lazy(() => import('../components/ShopByCategories/ShopByCategories.component'));
const ShopBySearch = lazy(() => import('../components/ShopBySearch/ShopBySearch.component'));

function PageFallback() {
  return <div style={{ padding: '6rem', textAlign: 'center', color: '#aaa', fontSize: '1.4rem' }}>Loading…</div>;
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, path: '/', element: <Wrap><Home /></Wrap> },
      {
        path: '/shop',
        element: <Wrap><Shop /></Wrap>,
        children: [
          { index: true, element: <ShopAllProducts /> },
          { path: '/shop/:category', element: <ShopByCategories /> },
          { path: '/shop/search/:query', element: <ShopBySearch /> },
        ],
      },
      { path: '/shop/product/:id', element: <Wrap><ProductDetails /></Wrap> },
    ],
  },
]);
