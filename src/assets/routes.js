import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout.component";
import Home from "../pages/Home/Home.component";
import Shop from "../pages/Shop/Shop.component";
import ShopAllProducts from "../components/ShopAllProducts/ShopAllProducts.component";
import ShopByCategories from "../components/ShopByCategories/ShopByCategories.component";
import ShopBySearch from "../components/ShopBySearch/ShopBySearch.component";
import ProductDetials from "../pages/ProductDetials/ProductDetials.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "/", element: <Home /> },
      {
        path: "/shop",
        element: <Shop />,
        children: [
          { index: true, element: <ShopAllProducts /> },
          { path: "/shop/:category", element: <ShopByCategories /> },
          { path: "/shop/search/:query", element: <ShopBySearch /> },
        ],
      },
      { path: "/shop/product/:id", element: <ProductDetials /> },
    ],
  },
]);
