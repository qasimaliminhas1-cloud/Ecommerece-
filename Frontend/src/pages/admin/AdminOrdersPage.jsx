import React, { useState } from "react";
import { Search, Eye, X, Package } from "lucide-react";

const initialOrders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2026-08-30",
    total: 299.98,
    status: "Delivered",
    items: [
      { name: "Wireless Headphones", price: 99.99, quantity: 2 },
      { name: "Ergonomic Chair", price: 99.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-1002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2026-08-31",
    total: 79.99,
    status: "Processing",
    items: [
      { name: "Running Shoes", price: 79.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-1003",
    customer: "Alex Johnson",
    email: "alex@example.com",
    date: "2026-08-31",
    total: 199.99,
    status: "Pending",
    items: [
      { name: "Ergonomic Chair", price: 199.99, quantity: 1 }
    ]
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Order Management</h1>
        <p style={{ color: "#666", margin: "4px 0 0 0" }}>View customer orders, update status, and track transactions.</p>
      </div>

      <div style={{ position: "relative", marginBottom: "20px", maxWidth: "400px" }}>
        <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
        <input
          type="text"
          placeholder="Search order ID or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 10px 10px 38px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "12px 16px" }}>Order ID</th>
              <th style={{ padding: "12px 16px" }}>Customer</th>
              <th style={{ padding: "12px 16px" }}>Date</th>
              <th style={{ padding: "12px 16px" }}>Total</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "600", color: "#2563eb" }}>{order.id}</td>
                  <td style={{ padding: "12px 16px" }}>{order.customer}</td>
                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>{order.date}</td>
                  <td style={{ padding: "12px 16px", fontWeight: "500" }}>${order.total.toFixed(2)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        backgroundColor:
                          order.status === "Delivered"
                            ? "#dcfce7"
                            : order.status === "Processing"
                            ? "#e0f2fe"
                            : "#fef3c7",
                        color:
                          order.status === "Delivered"
                            ? "#15803d"
                            : order.status === "Processing"
                            ? "#0369a1"
                            : "#b45309",
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{ border: "none", background: "none", cursor: "pointer", color: "#4b5563" }}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: "24px", textAlign: "center", color: "#6b7280" }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px" }}>Order Details ({selectedOrder.id})</h3>
              <button onClick={() => setSelectedOrder(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: "16px", fontSize: "14px" }}>
              <p style={{ margin: "4px 0" }}><strong>Customer:</strong> {selectedOrder.customer} ({selectedOrder.email})</p>
              <p style={{ margin: "4px 0" }}><strong>Date:</strong> {selectedOrder.date}</p>
              <p style={{ margin: "4px 0" }}><strong>Status:</strong> {selectedOrder.status}</p>
            </div>

            <h4 style={{ margin: "12px 0 8px 0", fontSize: "15px" }}>Purchased Items</h4>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: "6px", overflow: "hidden", marginBottom: "16px" }}>
              {selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justify: "space-between",
                    padding: "10px 12px",
                    borderBottom: index !== selectedOrder.items.length - 1 ? "1px solid #f3f4f6" : "none",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "500" }}>{item.name}</span>
                    <span style={{ color: "#6b7280", marginLeft: "8px" }}>x{item.quantity}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "16px" }}>
              <span>Total Amount:</span>
              <span>${selectedOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "480px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};