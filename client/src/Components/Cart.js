import React from "react";
import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/authContext";
import { Badge } from "antd";

const Cart = () => {
  const Navigate = () => useNavigate();
  const useAuth = () => useContext(AuthContext);
  const useCart = () => useContext(CartContext);
  const [auth, setAuth] = useAuth([]);
  const [Cart, setCart] = useCart([]);
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  //Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      Cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...Cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("Cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = () => {
    if (Cart.length > 0)
      return (
        <div>
          <h6 className="text-center">Total | Checkout | Payment</h6>
          <h6 className="p-3 text-center">
            <b>Price: </b>
            {totalPrice()}
          </h6>
          <div className="px-3 text-center mb-5">
            <Link to="/checkout">
              <button className="btn blue-btn">Proceed To Checkout</button>
            </Link>
          </div>
        </div>
      );
  };

  return (
    <div>
      <div className="container-fluid mt-3">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="d-flex">
            <div className="btn " onClick={ToggleSidebar}>
              <IconContext.Provider value={{ size: "2em" }}>
                <div>
                  <FiShoppingBag />
                </div>
              </IconContext.Provider>
            </div>
            <Badge count={Cart?.length} showZero offset={[-18, 0]}></Badge>
            <p className="head-cart">Cart</p>
          </div>
        </nav>
        <div className={`sidebar ${isOpen === true ? "active" : ""}`}>
          <div className="sd-header">
            <h4 className="mb-0">Your Cart</h4>
            <div className="btn blue-btn" onClick={ToggleSidebar}>
              X
            </div>
          </div>
          <p className="px-3">
            {Cart?.length
              ? `You have ${Cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : " Your Cart Is Empty"}
          </p>

          <div className="sd-body">
            {Cart?.map((p) => (
              <div className="row card flex-row sd-link mb-3" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"130px"}
                  />
                </div>
                <div className="col-md-6">
                  <p>{p.name}</p>
                  <p>PKR {p.price}</p>
                </div>
                <div className="col-md-2 cart-remove-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            <div>{checkout()} </div>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
          onClick={ToggleSidebar}
        ></div>
      </div>
    </div>
  );
};

export default Cart;
