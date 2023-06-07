import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Checkout from "./Pages/User/Checkout";
import CategoryPage from "./Pages/CategoryPage";
import ProductSinglePage from "./Pages/ProductSinglePage";
import PageNotFound from "./Pages/PageNotFound";
import About from "./Pages/AboutUs";
import Shop from "./Pages/Shop";
import Policy from "./Pages/Policy";
import Search from "./Pages/Search";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/User/Dashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { AuthState } from "./Context/authContext";
import { SearchState } from "./Context/SearchContext";
import { CartState } from "./Context/CartContext";
import PrivateRoute from "./Components/Routes/PrivateRoutes";
import AdminRoute from "./Components/Routes/AdminRoute";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Orders from "./Pages/User/Orders";
import AdminOrders from "./Pages/Admin/AdminOrders";
import Profile from "./Pages/User/Profile";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";

function App() {
  return (
    <>
      <AuthState>
        <SearchState>
          <CartState>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductSinglePage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="user" element={<Dashboard />} />
                <Route path="user/orders" element={<Orders />} />
                <Route path="user/profile" element={<Profile />} />
              </Route>
              <Route path="/dashboard" element={<AdminRoute />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route
                  path="admin/create-category"
                  element={<CreateCategory />}
                />
                <Route
                  path="admin/create-product"
                  element={<CreateProduct />}
                />
                <Route path="admin/product/:slug" element={<UpdateProduct />} />
                <Route path="admin/products" element={<Products />} />
                <Route path="admin/admin-orders" element={<AdminOrders />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </CartState>
        </SearchState>
      </AuthState>
    </>
  );
}

export default App;
