import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import Categories from "../Components/Categories";
import DeliverySteps from "../Components/DeliverySteps";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //getall products
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  //Get all categories
  const getAllCategories = async (req, res) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"CodySpot - Shopping Center"}>
      {isLoading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          <Link to={"/shop"}>
            <img
              src="./Graphics/banner-7.webp"
              alt="banner"
              width={"100%"}
              height={"450rem"}
            />
          </Link>

          <div className="px-5 mt-5">
            {/* Category Section */}
            <Categories />

            {/* Featured Products */}
            <div className="pt-5">
              <h5 className=" mt-5 heading text-blue">FEATURED PRODUCTS</h5>
              <div
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 150, height: 2, backgroundColor: "#c9a951" }}
              ></div>
              <div className="d-flex flex-wrap ms-3">
                {products.slice(0, 9).map((p) => (
                  <Link
                    to={`/product/${p.slug}`}
                    className="text-decoration-none text-black"
                    key={p.id}
                  >
                    <div
                      className="ms-3 cards"
                      style={{ width: "24rem" }}
                      key={p.id}
                    >
                      <div className="f-image">
                        <img
                          className="card-image"
                          src={`/api/v1/product/product-photo/${p._id}`}
                          style={{ height: "15rem" }}
                          alt={p.name}
                        ></img>
                      </div>

                      <div className="content">
                        <div className="card-body">
                          <h6 className="card-category">
                            {" "}
                            {p.category?.name}{" "}
                          </h6>
                          <h5 className="card-title text-blue"> {p.name}</h5>
                          <p className="card-text mt-3">
                            {p.description.substring(0, 60)}...
                          </p>
                          <div>
                            <p className="price"> Rs. {p.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Delivery Process */}
              <DeliverySteps />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
