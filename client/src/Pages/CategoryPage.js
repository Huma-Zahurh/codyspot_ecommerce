import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import CategoryPageSkeleton from "../Components/Skeleton/CategoryPageSkeleton";

const CategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const useCart = () => useContext(CartContext);
  const [Cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <CategoryPageSkeleton />;
  }

  return (
    <Layout title={`${category.name} | CodySpot - Shopping Center`}>
      <div className="container-fluid p-5 category">
        <div className="filters-bg catp-name">
          <h6 className="small-heading text-blue">{category?.name}</h6>
          <h6 className="text">Showing {products?.length} Products</h6>
        </div>
        <div className="row">
          <div>
            <div className="d-flex flex-wrap mt-5">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  key={p._id}
                  style={{ width: "18rem" }}
                >
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
