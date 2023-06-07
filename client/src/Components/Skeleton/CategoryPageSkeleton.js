import { Skeleton } from "antd";
import Layout from "../Layout/Layout";
import React, { useState } from "react";

export const Skeltons = () => <Skeleton active />;

const CategoryPageSkeleton = () => {
  const [products, setProducts] = useState([]);

  return (
    <Layout>
      <div className="container-fluid p-5 category">
        <div className="filters-bg catp-name">
          <h6 className="small-heading text-blue">*****</h6>
          <h6 className="text">Showing {products?.length} Products</h6>
        </div>
        <div className="row">
          <div>
            <div className="d-flex flex-wrap">
              <div className="product-skeleton mt-5 ">
                <div
                  className="card p-2 ms-3"
                  style={{ width: "18rem", height: "25rem" }}
                >
                  <Skeltons />
                  <Skeltons />
                </div>
                <div
                  className="card p-2  ms-3"
                  style={{ width: "18rem", height: "25rem" }}
                >
                  <Skeltons />
                  <Skeltons />
                </div>
                <div
                  className="card p-2 ms-3"
                  style={{ width: "18rem", height: "25rem" }}
                >
                  <Skeltons />
                  <Skeltons />
                </div>
                <div
                  className="card p-2  ms-3"
                  style={{ width: "18rem", height: "25rem" }}
                >
                  <Skeltons />
                  <Skeltons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPageSkeleton;
