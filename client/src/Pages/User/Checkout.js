import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { AuthContext } from "../../Context/authContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";

const Checkout = () => {
  const useCart = () => useContext(CartContext);
  const useAuth = () => useContext(AuthContext);
  const Navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [Cart, setCart] = useCart([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [products, setProducts] = useState(localStorage.getItem("Cart"));

  useEffect(() => {
    if (products) {
      const prodss = JSON.parse(products);
      const productIds = prodss.map((product) => product._id);
      console.log(productIds);
      setProducts(productIds);
    }
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/auth/order", {
        fName,
        email,
        address,
        country,
        state,
        zip,
        products,
      });
      console.log(response.data);
      setIsLoading(false);

      if (!fName) {
        return toast.error("Name is required");
      }
      if (!email) {
        return toast.error("Email is required");
      }
      if (!address) {
        return toast.error("Address is required");
      }
      if (!country) {
        return toast.error("Country is required");
      }
      if (!zip) {
        return toast.error("zip is required");
      }
      if (!state) {
        return toast.error("state is required");
      }

      toast.success("Order Placed Successfully");
      // Handle the successful order placement
    } catch (error) {
      console.error(error);
      toast.error("Something Went wrong");
      // Handle the error during order placement
    }
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

  return (
    <Layout title={"Checkout Page - CodySpot"}>
      {isLoading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      ) : (
        <div>
          <div className="px-5">
            <main>
              <div className="py-5 ">
                <h6 className="filters-bg small-heading">Checkout Page</h6>
              </div>
              <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-blue">Your cart</span>
                    <span className="badge bg-blue rounded-pill">
                      {Cart?.length}
                    </span>
                  </h4>
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">
                          <b>Product name</b>
                        </h6>
                        <small className="text-body-secondary"></small>
                      </div>
                      <b>PKR</b>
                    </li>

                    {Cart?.map((p) => (
                      <li
                        key={p._id}
                        className="list-group-item d-flex justify-content-between lh-sm"
                      >
                        <div>
                          <h6 className="my-0">{p.name}</h6>
                          <small className="text-body-secondary">
                            {p.description.substring(0, 25)}
                          </small>
                        </div>
                        <span className="text-body-secondary">{p.price}</span>
                      </li>
                    ))}

                    <li className="list-group-item d-flex justify-content-between">
                      <span>SubTotaL</span>
                      <strong>{totalPrice()}</strong>
                    </li>
                  </ul>

                  <h4 className="mb-3">Payment</h4>
                  <div className="my-3">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-7 col-lg-8 mb-5">
                  <h4 className="mb-3 text-blue">Billing address</h4>
                  <form className="needs-validation" onSubmit={handleCheckout}>
                    <div className="row g-3">
                      <div className="col-sm-12">
                        <label htmlFor="Name" className="form-label">
                          First name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                          placeholder="Name"
                        />
                      </div>

                      <div className="col-12"></div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Address"
                        />
                      </div>

                      <div className="col-md-5">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Country"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="State"
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="ZIP"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <button
                        className="w-100 btn blue-btn btn-lg "
                        type="submit"
                      >
                        Place Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Checkout;
