import { Skeleton } from "antd";
import Layout from "../Layout/Layout";
import React, { useState } from "react";
import { Checkbox, Radio } from "antd";

export const Skeltons = () => <Skeleton active />;

const CardSkeleton = () => {
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  return (
    <Layout>
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
                      <Skeltons />
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
            <div className="product-skeleton mt-5">
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
            </div>

            <div className="product-skeleton mt-5">
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
              <div
                className="card p-2"
                style={{ width: "13.5rem", height: "19rem" }}
              >
                <Skeltons />
                <Skeltons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CardSkeleton;
