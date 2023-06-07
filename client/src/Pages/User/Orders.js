import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../Context/authContext";
import { useContext } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const useAuth = () => useContext(AuthContext);
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orderss");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Orders - CodySpot"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h6 className="small-heading filters-bg mt-3">My Orders</h6>

            <div className="mt-5">
              {orders?.map((o, i) => {
                return (
                  <div className="text-center">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Products</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.fName}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
