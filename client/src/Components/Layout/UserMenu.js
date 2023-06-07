import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

const UserMenu = () => {
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
                to="/dashboard/user"
                className="list-group-item list-group-item-action navlink"
              >
                Dashboard
              </NavLink>
            </li>
          </div>
          <div className="flex mx-3">
            <span className="material-symbols-sharp">person_filled </span>
            <li className="p-3 mb-2">
              <NavLink
                to="/dashboard/user/profile"
                className="list-group-item list-group-item-action navlink"
              >
                Profile
              </NavLink>
            </li>
          </div>

          <div className="flex mx-3">
            <span className="material-symbols-sharp span">inventory </span>
            <li className="p-3 mb-2">
              <NavLink
                to="/dashboard/user/orders"
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

export default UserMenu;
