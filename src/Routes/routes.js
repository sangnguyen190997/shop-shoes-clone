import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";
import Login from "../Components/Login";
import ProductDetail from "../Components/ProductDetail";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import Products from "../Pages/Products";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/products/:id",
    component: ProductDetail,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/contact",
    component: Contact,
  },
];

export default publicRoutes;
