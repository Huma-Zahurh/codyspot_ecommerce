import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { SearchContext } from "../Context/SearchContext";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";

const Search = () => {
  const useCart = () => useContext(CartContext);
  const useSearch = () => useContext(SearchContext);
  const [values, setValues] = useSearch();
  const [Cart, setCart] = useCart([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout title={"Search results | CodySpot - Shopping Center"}>
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
        <div className="container-fluid">
          <div className="text-center m-5">
            <p className="filters-bg text">
              {values?.result.length < 1
                ? "Nothing Found"
                : `Found ${values?.result.length}`}{" "}
            </p>
          </div>

          <div className="d-flex flex-wrap ms-5 mb-5">
            {values?.result.map((p) => (
              <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
                <Link to={`/product/${p.slug}`}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{ height: "25rem" }}
                    alt={p.name}
                  />
                </Link>
                <div className="card-body">
                  <Link
                    to={`/product/${p.slug}`}
                    className="text-decoration-none text-black"
                  >
                    <div>
                      <div className="card-name-price">
                        <h5 className="card-title">
                          {p.name.substring(0, 20)}
                        </h5>
                        <h5 className="card-title card-price mt-3 text-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PKR",
                          })}
                        </h5>
                      </div>
                      <p className="card-text mt-3">
                        {p.description.substring(0, 30)}...
                      </p>
                    </div>
                  </Link>
                  <div className="card-name-price mt-3">
                    <button
                      className="btn blue-btn"
                      onClick={() => {
                        setCart([...Cart, p]);
                        localStorage.setItem(
                          "Cart",
                          JSON.stringify([...Cart, p])
                        );
                        toast.success("Successfully Item Added to Cart");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Search;
