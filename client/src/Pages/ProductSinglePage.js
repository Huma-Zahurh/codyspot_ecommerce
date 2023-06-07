import React from "react";
import { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";

const ProductSinglePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const useCart = () => useContext(CartContext);
  const [Cart, setCart] = useCart([]);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`${product.name} | CodySpot - Shopping Center`}>
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
          <div className="row container ">
            <div className="col-md-6">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top p-5 product-photo"
                alt={product.name}
                height="600px"
                width="20px"
              />
            </div>
            <div className="col-md-6 pt-5">
              <h6 className=" product-name">{product.name}</h6>
              <h6 className="product-price">
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "PKR",
                })}
              </h6>
              <h6 className="product-description mt-3">
                Description: <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {product.description}
              </h6>

              <h6 className="product-category mt-3">
                Category: {product?.category?.name}
              </h6>
              <button
                class="btn blue-btn ms-1 mt-3"
                onClick={() => {
                  setCart([...Cart, product]);
                  localStorage.setItem(
                    "Cart",
                    JSON.stringify([...Cart, product])
                  );
                  toast.success("Successfully Item Added to Cart");
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="row container similar-products m-5">
            <h4 className="text-blue mb-3">RELATED PRODUCTS</h4>
            {relatedProducts.length < 1 && (
              <p className="text-center small-heading">
                No Similar Products found
              </p>
            )}
            <div className="d-flex flex-wrap">
              {relatedProducts?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn blue-btn ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductSinglePage;
