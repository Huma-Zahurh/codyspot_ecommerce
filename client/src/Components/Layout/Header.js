import { Link } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../Context/authContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import SearchForm from "../Forms/SearchForm";
import useCategory from "../../Hooks/useCategory";
import Cart from "../Cart";
import codyspot from "../../../src/codyspot.PNG";

const Header = () => {
  const useAuth = () => useContext(AuthContext);

  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="header-topbar">
        <h5>Free Shipping All Over In Pakistan.</h5>
      </div>

      <div className="main-container container d-flex align-items-center">
        <div className="header-img">
          <Link to="/" className="navbar-brand">
            <img
              className="head-img"
              src={codyspot}
              width={"230px"}
              alt="This is an about "
            />
          </Link>
        </div>
        <SearchForm />
        <Cart />
      </div>

      <nav className="navbar navbar-expand-lg nav-menu ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item menu-item">
                <Link
                  to="/"
                  className="nav-link active nav-item"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item menu-item">
                <Link
                  to="/shop"
                  className="nav-link active nav-item"
                  aria-current="page"
                >
                  Shop
                </Link>
              </li>

              {categories?.map((c) => (
                <li className="nav-item menu-item" key={c._id}>
                  <Link
                    className="nav-link nav-item"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}

              <li className="nav-item menu-item ">
                <Link to="/about" className="nav-link nav-item">
                  About
                </Link>
              </li>
              <li className="nav-item menu-item ">
                <Link to="/policy" className="nav-link nav-item">
                  Policy
                </Link>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item menu-item">
                    <Link to="/register" className="nav-link nav-item">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item menu-item">
                    <Link to="/login" className="nav-link nav-item">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown ">
                    <Link
                      className="nav-link dropdown-toggle nav-item"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu ">
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
