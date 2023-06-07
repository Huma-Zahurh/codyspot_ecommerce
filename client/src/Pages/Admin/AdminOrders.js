
import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { AuthContext } from "../../Context/authContext";
import { useContext } from "react";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;


const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const useAuth = () => useContext(AuthContext);
    const [auth, setAuth] = useAuth();

    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
      ]);
      const [changeStatus, setCHangeStatus] = useState("");
      const getOrders = async () => {
        try {
          const { data } = await axios.get("/api/v1/auth/all-orders");
          setOrders(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        if (auth?.token) getOrders();
      }, [auth?.token]);
    
      const handleChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
            status: value,
          });
          getOrders();
        } catch (error) {
          console.log(error);
        }
      };
  
  return (
    <Layout>
       
       <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h6 className="small-heading filters-bg mt-3">All Orders</h6>

            {orders?.map((o, i) => {
            return (
              <div className="mt-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Address</th>
                      <th scope="col">Date</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.fName}</td>
                      <td>{o?.address}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="50px"
                          height={"300px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}


          </div>
        </div>
      </div>


    </Layout>
  )
}

export default AdminOrders
