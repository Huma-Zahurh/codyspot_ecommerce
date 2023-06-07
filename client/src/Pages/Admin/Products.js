import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //delete a product
  const handleDelete = async (Id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${Id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="row dashboard container-fluid">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="small-heading filters-bg mt-3 ">Products List</h1>
          <div className="w-100">
            <div className="">
              <div className="text-center">
                <table className="table w-100">
                  <thead>
                    <tr className="w-100">
                      <th style={{ width: "8%" }}>Image</th>
                      <th style={{ width: "16%" }}>Name</th>
                      <th style={{ width: "16%" }}>Category</th>
                      <th style={{ width: "16%" }}>Price</th>
                      <th style={{ width: "16%" }}>Quantity</th>
                      <th style={{ width: "16%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((p) => {
                      return (
                        <tr key={p._id}>
                          <td className="" style={{ width: "3rem" }}>
                            {" "}
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                            />
                          </td>

                          <td> {p.name}</td>
                          <td>{p.category.name}</td>
                          <td>{p.price}</td>
                          <td>{p.quantity}</td>
                          <td>
                            <Link
                              key={p._id}
                              to={`/dashboard/admin/product/${p.slug}`}
                              className="product-link"
                            >
                              <button className="btn blue-btn">Edit</button>
                            </Link>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => handleDelete(p._id)}
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
