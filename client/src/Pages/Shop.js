import Layout from "../Components/Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Price";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import CardSkeleton from "../Components/Skeleton/CarfSkeleton";

const Shop = () => {
  const useCart = () => useContext(CartContext);
  const [Cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const Navigate = useNavigate();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let allProducts = [...checked];
    if (value) {
      allProducts.push(id);
    } else {
      allProducts = allProducts.filter((c) => c !== id);
    }
    setChecked(allProducts);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) FilteredProducts();
  }, [checked, radio]);

  // Get Filtered Products
  const FilteredProducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Products Count
  const getCount = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //Get all categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getCount();
  }, []);

  return (
    <Layout title={"Shop | CodySpot - Shopping Center"}>
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-md-3">
            <div>
              <div className=" filters-bg">
                <h5 className=" mb-4 small-heading">CATEGORIES</h5>
                <div className="d-flex flex-column">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}{" "}
                    </Checkbox>
                  ))}
                </div>
              </div>
              {/* Price Filter */}
              <div className="mt-4">
                <div className=" filters-bg">
                  <h5 className="mb-4 small-heading">BY PRICE</h5>
                  <div className="d-flex flex-column">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices?.map((p) => (
                        <div key={p._id}>
                          <Radio value={p.Array}>{p.name}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                </div>

                {/* Rest filters */}
                <div className=" filters-bg mt-4">
                  <h5 className="mb-4 small-heading">REST ALL FILTERS</h5>
                  <button
                    className="btn blue-btn"
                    onClick={() => window.location.reload()}
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <h6 className="filters-bg text">
              Showing {products?.length} of {total} Products{" "}
            </h6>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "13.5rem" }}
                  key={p._id}
                >
                  <Link to={`/product/${p.slug}`}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{ height: "19rem" }}
                      alt={p.name}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      to={`/product/${p.slug}`}
                      className="text-decoration-none text-black"
                    >
                      <div>
                        <h5 className="card-title">
                          {p.name.substring(0, 18)}
                        </h5>
                        <p className="card-text mb-4">
                          {p.description.substring(0, 25)}
                        </p>
                      </div>
                    </Link>

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
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
