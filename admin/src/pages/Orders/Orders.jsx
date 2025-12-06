import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(`${url}/api/order/list`);
      if (data.success) {
        setOrders(data.data || []);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const { data } = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      if (data.success) {
        // update in frontend state too
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Status updated");
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  const getStatusClass = (status = "") =>
    `orders-status orders-status-${status.toLowerCase().replace(/\s/g, "")}`;

  const statusOptions = [
    "Food Processing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="orders-page">
      <header className="orders-header-bar">
        <div>
          <h2>All Orders</h2>
          <p>View and manage all customer orders from this panel.</p>
        </div>
      </header>

      <section className="orders-content">
        {loading ? (
          <div className="orders-loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">No orders found.</div>
        ) : (
          <div className="orders-table">
            <div className="orders-row orders-row-head">
              <span>Order</span>
              <span>Items</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Address</span>
              <span>Created</span>
            </div>

            {orders.map((order) => (
              <div key={order._id} className="orders-row">
                <span className="orders-orderid">
                  #{order._id ? order._id.slice(-6) : ""}
                </span>

                <span className="orders-items">
                  {order.items
                    ?.map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </span>

                <span className="orders-amount">${order.amount}</span>

                {/* ADMIN DROPDOWN TO CHANGE STATUS */}
                <span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className={getStatusClass(order.status)}>
                    {order.status}
                  </div>
                </span>

                <span className="orders-address">
                  {order.address ? (
                    <>
                      {order.address.firstName} {order.address.lastName}
                      <br />
                      {order.address.street}, {order.address.city},{" "}
                      {order.address.state} - {order.address.pincode}
                      <br />
                      {order.address.phone}
                    </>
                  ) : (
                    "No address"
                  )}
                </span>

                <span className="orders-date">
                  {order.date ? new Date(order.date).toLocaleString() : "-"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;

