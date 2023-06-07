import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className=" mt-5">
        <div className="category-section">
          <h5 className="heading text-blue">SHOP BY CATEGORY</h5>
          <div
            className="mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: 150, height: 2, backgroundColor: "#c9a951" }}
          />
          <div className="banners pt-3">
            <div className="cat-box">
              <Link to={"/category/lawn"}>
                <img
                  src="./Graphics/cat-1.WEBP"
                  alt="category"
                  width={"160px"}
                />
              </Link>
              <h6 className="pt-3 text-blue small-heading">LAWN</h6>
            </div>
            <div className="cat-box">
              <Link to={"/category/chiffon"}>
                <img
                  src="./Graphics/cat-2.WEBP"
                  alt="category"
                  width={"160px"}
                />
              </Link>
              <h6 className="pt-3 text-blue small-heading">CHIFFON</h6>
            </div>
            <div className="cat-box">
              <Link to={"/"}>
                <img
                  src="./Graphics/cat-3.WEBP"
                  alt="category"
                  width={"160px"}
                />
              </Link>
              <h6 className="pt-3 text-blue small-heading">JACKQUARD</h6>
            </div>
            <div className="cat-box">
              <Link to={"/"}>
                <img
                  src="./Graphics/cat-4.WEBP"
                  alt="category"
                  width={"160px"}
                />
              </Link>
              <h6 className="pt-3 text-blue small-heading">CUTWORK</h6>
            </div>
            <div className="cat-box">
              <Link to={"/category/mysoori"}>
                <img
                  src="./Graphics/cat-5.WEBP"
                  alt="category"
                  width={"160px"}
                />
              </Link>
              <h6 className="pt-3 text-blue small-heading">MYSOORI</h6>
            </div>
            <div className="cat-box">
              <Link to={"/category/organza"}>
                <img
                  src="./Graphics/cat-6.WEBP"
                  alt="category"
                  width={"160px"}
                />
              </Link>
              <h6 className="pt-3 text-blue small-heading">ORGANZA</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
