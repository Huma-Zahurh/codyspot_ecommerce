import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { AuthContext } from "../../Context/authContext";
import { useContext } from "react";

const Dashboard = () => {
  const useAuth = () => useContext(AuthContext);
  const [auth] = useAuth();

  return (
    <Layout title={"User Dashboard"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h6 className="small-heading filters-bg mt-3">User Dashboard</h6>

            <h5 className=" mt-5 heading text-blue ms-3 mb-0">USER INFO</h5>
            <div
              className="ms-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: 150, height: 2, backgroundColor: "#c9a951" }}
            ></div>

            <div className="flex w-100 py-4 px-4">
              <div
                className="filters-bg text-center  py-5 borders"
                style={{ width: "33%" }}
              >
                <span className="material-symbols-sharp">person_filled </span>
                <h6 className="heading-1 text-blue">Name </h6>
                <h6 className="heading-2">{auth?.user?.name} </h6>
              </div>

              <div
                className="filters-bg text-center ms-3 py-5 borders"
                style={{ width: "33%" }}
              >
                <span className="material-symbols-sharp">mail </span>
                <h6 className="heading-1 text-blue">Email </h6>
                <h6 className="heading-2">{auth?.user?.email} </h6>
              </div>

              <div
                className="filters-bg text-center ms-3 py-5 borders"
                style={{ width: "33%" }}
              >
                <span className="material-symbols-sharp">phone </span>
                <h6 className="heading-1 text-blue">Phone # </h6>
                <h6 className="heading-2">{auth?.user?.phone} </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
