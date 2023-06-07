import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

const AdminMenu = () => {
  return (
    <>
      <div className="px-3 bgr-blue  mt-3">
        <h4
          className="pt-3 text-center heading"
          style={{ color: "whitesmoke" }}
        >
          DASH<span style={{ color: "#329da8" }}>BOARD</span>
        </h4>
        <ul className="li-items list-unstyled ">
          <div className="flex mx-3">
            <span className="material-symbols-sharp span">grid_view </span>
            <li className="p-3 mb-2">
              <NavLink
                to="/dashboard/admin"
                className="list-group-item list-group-item-action navlink"
              >
                Dashboard
              </NavLink>
            </li>
          </div>
          <div className="flex mx-3">
            <span className="material-symbols-sharp span">insights </span>
            <li className="p-3 mb-2">
              <NavLink
                to="/dashboard/admin/create-category"
                className="list-group-item list-group-item-action navlink"
              >
                Create Category
              </NavLink>
            </li>
          </div>
          <div className="flex mx-3">
            <span className="material-symbols-sharp span">add</span>
            <li className="p-3 mb-2">
              <NavLink
                to="/dashboard/admin/create-product"
                className="list-group-item list-group-item-action"
              >
                Create Product
              </NavLink>
            </li>
          </div>

          <div className="flex mx-3">
            <span className="material-symbols-sharp span">inventory </span>
            <li className="p-3 mb-2">
              <NavLink
                to="/dashboard/admin/products"
                className="list-group-item list-group-item-action"
              >
                Products
              </NavLink>
            </li>
          </div>
          <div className="flex mx-3">
            <span className="material-symbols-sharp span">inventory </span>
            <li className="p-3 mb-2">
              <NavLink
                to="/dashboard/admin/admin-orders"
                className="list-group-item list-group-item-action"
              >
                Orders
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
